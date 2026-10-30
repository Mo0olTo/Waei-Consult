import { inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageMeta {
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.applyDescription());
  }

  private applyDescription(): void {
    const description = routeDescription(this.router.routerState.snapshot.root);
    if (!description) {
      return;
    }

    this.meta.updateTag({ name: 'description', content: description });
  }
}

function routeDescription(root: ActivatedRouteSnapshot): string | null {
  let current: ActivatedRouteSnapshot | null = root;
  let description: string | null = null;

  while (current) {
    const value: unknown = current.data['description'];
    if (typeof value === 'string' && value.trim().length > 0) {
      description = value;
    }
    current = current.firstChild;
  }

  return description;
}
