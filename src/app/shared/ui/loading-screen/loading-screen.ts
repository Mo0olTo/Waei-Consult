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
import {
  isSamePageFragmentChange,
  LOADING_MIN_VISIBLE_MS,
  loadingFadeMs,
} from './loading-navigation';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.scss',
})
export class LoadingScreen {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private navigationStartedAt: number | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private removeTimer: ReturnType<typeof setTimeout> | null = null;
  private session = 0;

  readonly present = signal(false);
  readonly leaving = signal(false);
  readonly fadeDuration = `${loadingFadeMs()}ms`;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.session++;
      this.clearRemoveTimer();
      this.clearHideTimer();
    });

    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (
          this.router.navigated &&
          !isSamePageFragmentChange(this.router.url, event.url)
        ) {
          this.show();
        }
        return;
      }

      if (event instanceof NavigationSkipped) {
        this.hideNow();
        return;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.scheduleHide();
      }
    });
  }

  private show(): void {
    this.clearHideTimer();
    this.clearRemoveTimer();
    this.session++;
    this.navigationStartedAt = Date.now();
    this.leaving.set(false);
    this.present.set(true);
  }

  private scheduleHide(): void {
    if (!this.present()) {
      return;
    }

    const startedAt = this.navigationStartedAt ?? Date.now();
    const remaining = Math.max(0, LOADING_MIN_VISIBLE_MS - (Date.now() - startedAt));

    this.clearHideTimer();
    this.hideTimer = setTimeout(() => {
      this.hideTimer = null;
      this.startLeave();
    }, remaining);
  }

  private startLeave(): void {
    const session = ++this.session;
    this.leaving.set(true);

    const wait = loadingFadeMs();
    if (wait === 0) {
      this.present.set(false);
      this.leaving.set(false);
      this.navigationStartedAt = null;
      return;
    }

    this.clearRemoveTimer();
    this.removeTimer = setTimeout(() => {
      this.removeTimer = null;
      if (session !== this.session) {
        return;
      }
      this.present.set(false);
      this.leaving.set(false);
      this.navigationStartedAt = null;
    }, wait);
  }

  private hideNow(): void {
    this.session++;
    this.clearHideTimer();
    this.clearRemoveTimer();
    this.navigationStartedAt = null;
    this.leaving.set(false);
    this.present.set(false);
  }

  private clearHideTimer(): void {
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  private clearRemoveTimer(): void {
    if (this.removeTimer !== null) {
      clearTimeout(this.removeTimer);
      this.removeTimer = null;
    }
  }
}
