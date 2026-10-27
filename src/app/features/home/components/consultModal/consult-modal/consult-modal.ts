import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-consult-modal',
  imports: [],
  templateUrl: './consult-modal.html',
  styleUrl: './consult-modal.scss',
})
export class ConsultModal implements OnDestroy {
  private readonly document = inject(DOCUMENT);

  protected readonly isOpen = signal(false);
  protected readonly whatsappHref = 'https://wa.me/201061510041';

  protected open(): void {
    this.isOpen.set(true);
    this.document.body.style.overflow = 'hidden';
  }

  protected close(): void {
    this.isOpen.set(false);
    this.document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }
}
