import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { buildFaqJsonLd, HOME_FAQ } from '../../data/faq-home.data';

const FAQ_JSON_LD_ID = 'faq-home-jsonld';

@Component({
  selector: 'app-faq-home',
  imports: [],
  templateUrl: './faq-home.html',
  styleUrl: './faq-home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqHome {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  /** Null keeps every item closed. Opening one item closes the rest. */
  protected readonly openId = signal<string | null>(null);
  protected readonly items = HOME_FAQ;

  constructor() {
    const script = this.ensureJsonLdScript();
    this.destroyRef.onDestroy(() => script.remove());
  }

  protected toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }

  protected isOpen(id: string): boolean {
    return this.openId() === id;
  }

  protected panelId(id: string): string {
    return `faq-panel-${id}`;
  }

  protected buttonId(id: string): string {
    return `faq-button-${id}`;
  }

  /** One script in <head>, shared by server render and client hydration. */
  private ensureJsonLdScript(): HTMLScriptElement {
    const existing = this.document.getElementById(FAQ_JSON_LD_ID);
    const script =
      existing instanceof HTMLScriptElement ? existing : this.document.createElement('script');

    script.id = FAQ_JSON_LD_ID;
    script.type = 'application/ld+json';
    script.textContent = buildFaqJsonLd(HOME_FAQ);

    if (!existing) {
      this.document.head.appendChild(script);
    }

    return script;
  }
}
