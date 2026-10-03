import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { polarPoint, ringSectorPath, WHEEL_CENTER } from './rotating-wheel.geometry';

export interface WheelSegment {
  id: string;
  lines: readonly [string, string];
}

interface WheelSector {
  id: string;
  path: string;
  labelX: number;
  labelY: number;
  lines: readonly [string, string];
  ariaLabel: string;
}

const OUTER_RADIUS = 385;
const HUB_RADIUS = 90;
const LABEL_RADIUS = 245;

@Component({
  selector: 'app-rotating-wheel',
  templateUrl: './rotating-wheel.html',
  styleUrl: './rotating-wheel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--wheel-duration]': 'durationSeconds() + "s"',
    '[class.is-paused]': 'paused()',
  },
})
export class RotatingWheel {
  readonly segments = input.required<readonly WheelSegment[]>();
  readonly label = input.required<string>();
  readonly durationSeconds = input(80);
  readonly paused = input(false);
  readonly activeIndex = model<number | null>(null);

  protected readonly center = WHEEL_CENTER;
  protected readonly hubRadius = HUB_RADIUS;

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
      };
    });
  });

  protected activate(index: number): void {
    this.activeIndex.set(index);
  }

  protected activateWithKey(event: Event, index: number): void {
    event.preventDefault();
    this.activate(index);
  }
}
