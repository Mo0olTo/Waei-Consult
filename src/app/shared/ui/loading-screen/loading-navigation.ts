import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const LOADING_MIN_VISIBLE_MS = 300;
export const LOADING_FADE_MS = 350;

export function loadingFadeMs(): number {
  if (
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return 0;
  }
  return LOADING_FADE_MS;
}

/** How long to keep the current page mounted so the overlay can fade in over it. */
export function loadingCoverDelayMs(): number {
  const fade = loadingFadeMs();
  return fade === 0 ? 0 : fade + 80;
}

/** Same path and query, with a new hash. In-page section jumps should not cover the page. */
export function isSamePageFragmentChange(currentUrl: string, nextUrl: string): boolean {
  const hashIndex = nextUrl.indexOf('#');
  if (hashIndex === -1) {
    return false;
  }

  return currentUrl.split('#')[0] === nextUrl.slice(0, hashIndex);
}

export const holdForLoadingScreen: CanActivateChildFn = () => {
  const router = inject(Router);
  const navigation = router.getCurrentNavigation();
  const target = navigation?.finalUrl ?? navigation?.extractedUrl;
  if (
    !isPlatformBrowser(inject(PLATFORM_ID)) ||
    !router.navigated ||
    (target !== undefined &&
      isSamePageFragmentChange(router.url, router.serializeUrl(target)))
  ) {
    return true;
  }

  const wait = loadingCoverDelayMs();
  if (wait === 0) {
    return true;
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(true), wait);
  });
};
