import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MAIN_NAVIGATION } from '../../core/navigation';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  host: {
    class: 'sticky top-0 z-40 block',
    '[class.is-scrolled]': 'isScrolled()',
  },
})
export class Navbar {
  protected readonly links = MAIN_NAVIGATION;
  protected readonly isMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const enterAt = 64;
      const leaveAt = 8;

      const onScroll = (): void => {
        const y = window.scrollY;
        this.isScrolled.update((scrolled) => (scrolled ? y > leaveAt : y > enterAt));
      };

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
