import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router,
} from '@angular/router';

const SHOW_DELAY_MS = 150;

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.scss',
})
export class LoadingScreen {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private showTimer: ReturnType<typeof setTimeout> | null = null;

  readonly visible = signal(false);

  constructor() {
    this.destroyRef.onDestroy(() => this.clearShowTimer());

    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.router.navigated) {
          this.scheduleShow();
        }
        return;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError ||
        event instanceof NavigationSkipped
      ) {
        this.hide();
      }
    });
  }

  private scheduleShow(): void {
    this.clearShowTimer();
    this.showTimer = setTimeout(() => {
      this.showTimer = null;
      this.visible.set(true);
    }, SHOW_DELAY_MS);
  }

  private hide(): void {
    this.clearShowTimer();
    this.visible.set(false);
  }

  private clearShowTimer(): void {
    if (this.showTimer !== null) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }
}
