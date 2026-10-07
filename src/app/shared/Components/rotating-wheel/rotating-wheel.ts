import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
  viewChildren,
} from '@angular/core';
import { polarPoint, ringSectorPath, WHEEL_CENTER } from './rotating-wheel.geometry';

export interface WheelSegment {
  id: string;
  lines: readonly [string, string];
}

interface PointerMetrics {
  geometryAngle: number;
  distance: number;
  scale: number;
}

interface WheelSector {
  id: string;
  path: string;
  labelX: number;
  labelY: number;
  lineY1: number;
  lineY2: number;
  lines: readonly [string, string];
  ariaLabel: string;
}

const OUTER_RADIUS = 385;
const HUB_RADIUS = 90;
const LABEL_RADIUS = 245;
/** User units. Matches the previous 22px size on the unscaled 800-unit wheel. */
const LABEL_FONT_SIZE = 22;
/** Same stack as the old tspans: first line -0.35em, second line 1.3em below that. */
const FIRST_LINE_SHIFT = -0.35 * LABEL_FONT_SIZE;
const SECOND_LINE_SHIFT = (-0.35 + 1.3) * LABEL_FONT_SIZE;

const round = (value: number): number => Math.round(value * 100) / 100;
const DRAG_THRESHOLD_PX = 8;
const VIEWBOX_SIZE = WHEEL_CENTER * 2;

@Component({
  selector: 'app-rotating-wheel',
  templateUrl: './rotating-wheel.html',
  styleUrl: './rotating-wheel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RotatingWheel {
  readonly segments = input.required<readonly WheelSegment[]>();
  readonly label = input.required<string>();
  readonly durationSeconds = input(80);
  readonly paused = input(false);
  readonly activeIndex = model<number | null>(null);

  protected readonly center = WHEEL_CENTER;
  protected readonly hubRadius = HUB_RADIUS;
  protected readonly labelFontSize = LABEL_FONT_SIZE;

  protected readonly sectors = computed<WheelSector[]>(() => {
    const segments = this.segments();
    const step = 360 / segments.length;

    return segments.map((segment, index) => {
      const start = index * step;
      const label = polarPoint(LABEL_RADIUS, start + step / 2);
      return {
        id: segment.id,
        lines: segment.lines,
        ariaLabel: segment.lines.join(' '),
        path: ringSectorPath(start, start + step, OUTER_RADIUS, HUB_RADIUS),
        labelX: label.x,
        labelY: label.y,
        lineY1: round(label.y + FIRST_LINE_SHIFT),
        lineY2: round(label.y + SECOND_LINE_SHIFT),
      };
    });
  });

  private readonly rotor = viewChild.required<ElementRef<SVGGElement>>('rotor');
  private readonly labels = viewChildren<ElementRef<SVGGElement>>('label');
  private pointerOver = false;
  private focusInside = false;
  private angle = 0;
  private tracking = false;
  private dragArmed = false;
  private activePointerId: number | null = null;
  private dragOriginX = 0;
  private dragOriginY = 0;
  private lastPointerAngle = 0;
  private consumedPointer = false;
  private wheelElement: SVGSVGElement | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let reducedMotion = motion.matches;
      const onMotionChange = (): void => {
        reducedMotion = motion.matches;
      };
      motion.addEventListener('change', onMotionChange);

      let last = performance.now();
      let frame = 0;

      const tick = (now: number): void => {
        const delta = now - last;
        last = now;

        if (!reducedMotion && !this.held()) {
          const durationMs = this.durationSeconds() * 1000;
          if (durationMs > 0) {
            this.angle = this.normalize(this.angle + (delta * 360) / durationMs);
            this.paint(this.angle);
          }
        }

        frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        motion.removeEventListener('change', onMotionChange);
      });
    });
  }

  protected activate(index: number): void {
    if (this.dragArmed) {
      return;
    }
    this.activeIndex.set(index);
  }

  protected onSectorClick(event: Event, index: number): void {
    if (this.consumedPointer) {
      this.consumedPointer = false;
      event.preventDefault();
      return;
    }
    this.activate(index);
  }

  protected activateWithKey(event: Event, index: number): void {
    event.preventDefault();
    this.consumedPointer = false;
    this.activeIndex.set(index);
  }

  protected onDragStart(event: PointerEvent): void {
    if (this.tracking || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }
    const wheel = event.currentTarget;
    if (!(wheel instanceof SVGSVGElement)) {
      return;
    }

    this.wheelElement = wheel;
    this.tracking = true;
    this.dragArmed = false;
    this.activePointerId = event.pointerId;
    this.dragOriginX = event.clientX;
    this.dragOriginY = event.clientY;
    try {
      wheel.setPointerCapture(event.pointerId);
    } catch {
      // A pointer the browser is not tracking can still drag through these listeners.
    }
  }

  protected onDragMove(event: PointerEvent): void {
    if (!this.tracking || event.pointerId !== this.activePointerId) {
      return;
    }
    const metrics = this.wheelMetrics(event);
    if (!metrics) {
      return;
    }

    if (!this.dragArmed) {
      const dx = event.clientX - this.dragOriginX;
      const dy = event.clientY - this.dragOriginY;
      if (dx * dx + dy * dy < DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) {
        return;
      }
      this.dragArmed = true;
      this.wheelElement?.classList.add('is-dragging');
      this.lastPointerAngle = metrics.geometryAngle;
      return;
    }

    let delta = metrics.geometryAngle - this.lastPointerAngle;
    if (delta > 180) {
      delta -= 360;
    } else if (delta < -180) {
      delta += 360;
    }
    this.lastPointerAngle = metrics.geometryAngle;
    this.angle = this.normalize(this.angle + delta);
    this.paint(this.angle);

    if (this.isOnRing(metrics)) {
      this.activeIndex.set(this.sectorIndex(metrics.geometryAngle));
    }
  }

  protected onDragEnd(event: PointerEvent): void {
    if (event.pointerId !== this.activePointerId) {
      return;
    }
    const wasDrag = this.dragArmed;
    const metrics = this.wheelMetrics(event);
    this.endDrag();
    if (event.type === 'pointercancel' || !metrics) {
      return;
    }

    if (wasDrag || this.isOnRing(metrics)) {
      this.consumedPointer = true;
      this.activeIndex.set(this.sectorIndex(metrics.geometryAngle));
    }
  }

  /** Touch fires mouseenter and often never mouseleave, which would keep the wheel stopped. */
  protected onPointerEnter(event: PointerEvent): void {
    if (event.pointerType === 'touch') {
      return;
    }
    this.pointerOver = true;
  }

  protected onPointerLeave(event: PointerEvent): void {
    if (event.pointerType === 'touch') {
      return;
    }
    this.pointerOver = false;
  }

  protected onFocusIn(): void {
    this.focusInside = true;
  }

  protected onFocusOut(event: FocusEvent): void {
    const root = event.currentTarget as Element;
    if (!root.contains(event.relatedTarget as Node | null)) {
      this.focusInside = false;
    }
  }

  private held(): boolean {
    return this.paused() || this.pointerOver || this.focusInside || this.tracking;
  }

  private endDrag(): void {
    this.tracking = false;
    this.dragArmed = false;
    this.activePointerId = null;
    this.wheelElement?.classList.remove('is-dragging');
  }

  private wheelMetrics(event: PointerEvent): PointerMetrics | null {
    const wheel = this.wheelElement;
    if (!wheel) {
      return null;
    }
    const rect = wheel.getBoundingClientRect();
    if (rect.width === 0) {
      return null;
    }
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    return {
      geometryAngle: this.normalize((Math.atan2(dy, dx) * 180) / Math.PI + 90),
      distance: Math.hypot(dx, dy),
      scale: rect.width / VIEWBOX_SIZE,
    };
  }

  private isOnRing(metrics: PointerMetrics): boolean {
    const inner = HUB_RADIUS * metrics.scale;
    const outer = OUTER_RADIUS * metrics.scale;
    return metrics.distance >= inner && metrics.distance <= outer;
  }

  private sectorIndex(geometryAngle: number): number {
    const count = this.segments().length;
    const local = this.normalize(geometryAngle - this.angle);
    return Math.floor(local / (360 / count)) % count;
  }

  private normalize(angle: number): number {
    return ((angle % 360) + 360) % 360;
  }

  /** SVG attributes, not CSS transforms: a CSS rotate on the scaled wheel flips the two lines. */
  private paint(angle: number): void {
    const rounded = Math.round(angle * 1000) / 1000;
    this.rotor().nativeElement.setAttribute(
      'transform',
      `rotate(${rounded} ${WHEEL_CENTER} ${WHEEL_CENTER})`,
    );

    for (const label of this.labels()) {
      const element = label.nativeElement;
      const x = element.getAttribute('data-lx');
      const y = element.getAttribute('data-ly');
      if (x === null || y === null) {
        continue;
      }
      element.setAttribute('transform', `rotate(${-rounded} ${x} ${y})`);
    }
  }
}
