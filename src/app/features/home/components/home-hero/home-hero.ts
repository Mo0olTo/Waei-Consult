import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RotatingWheel } from '../../../../shared/Components/rotating-wheel/rotating-wheel';
import { HOME_WHEEL_ITEMS, HomeWheelItem } from '../../data/home-wheel.data';
import { GrowthChart } from '../growth-chart/growth-chart';
import { DecisionRings } from '../decision-rings/decision-rings';

@Component({
  selector: 'app-home-hero',
  imports: [RouterLink, RotatingWheel, GrowthChart, DecisionRings],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHero {
  protected readonly items = HOME_WHEEL_ITEMS;
  protected readonly activeIndex = signal<number | null>(null);

  private readonly focusInside = signal(false);
  private readonly canHover = signal(true);

  // Touch screens have no hover, so a tapped sector keeps the wheel stopped.
  protected readonly wheelPaused = computed(
    () => this.focusInside() || (!this.canHover() && this.activeIndex() !== null),
  );

  /** Holds zero or one item so @for re-creates the panel (and replays the fade) on change. */
  protected readonly activeItems = computed<readonly HomeWheelItem[]>(() => {
    const index = this.activeIndex();
    return index === null ? [] : [this.items[index]];
  });

  private readonly host = inject(ElementRef<HTMLElement>);
  private alive = true;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const query = window.matchMedia('(hover: hover)');
      const sync = (): void => this.canHover.set(query.matches);
      sync();
      query.addEventListener('change', sync);

      // A phone tap does not blur the sector, so pause stays on until an outside tap.
      const release = (event: PointerEvent): void => this.releaseIfOutside(event);
      document.addEventListener('pointerdown', release);

      destroyRef.onDestroy(() => {
        this.alive = false;
        query.removeEventListener('change', sync);
        document.removeEventListener('pointerdown', release);
      });
    });
  }

  private releaseIfOutside(event: PointerEvent): void {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const wheel = this.host.nativeElement.querySelector('app-rotating-wheel');
    if (wheel?.contains(target)) {
      return;
    }

    const release = (): void => {
      this.activeIndex.set(null);
      const active = document.activeElement;
      if (active instanceof HTMLElement && wheel?.contains(active)) {
        active.blur();
      }
    };

    // The service link sits outside the wheel. Clear after its click so navigation still runs.
    if (target.closest('a, button')) {
      setTimeout(() => {
        if (this.alive) {
          release();
        }
      });
      return;
    }

    release();
  }

  protected onFocusIn(): void {
    this.focusInside.set(true);
  }

  protected onFocusOut(event: FocusEvent): void {
    const section = event.currentTarget as HTMLElement;
    if (!section.contains(event.relatedTarget as Node | null)) {
      this.focusInside.set(false);
    }
  }
}
