import { afterNextRender, Component, inject, Injector, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ContactForm } from './components/contact-form/contact-form/contact-form';
import { FreeDiagnosis } from './components/free-diagnosis/free-diagnosis/free-diagnosis';

type ContactIntent = 'message' | 'diagnosis' | '';

@Component({
  selector: 'app-contact',
  imports: [ContactForm, FreeDiagnosis],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly injector = inject(Injector);

  protected readonly intent = signal<ContactIntent>('');

  constructor() {
    inject(ActivatedRoute)
      .queryParamMap.pipe(takeUntilDestroyed())
      .subscribe((params) => {
        if (params.get('form') !== 'diagnosis') {
          return;
        }

        this.intent.set('diagnosis');
        afterNextRender(() => this.scrollToForm(), { injector: this.injector });
      });
  }

  protected showForm(intent: ContactIntent): void {
    this.intent.set(intent);
    this.scrollToForm();
  }

  private scrollToForm(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }
}
