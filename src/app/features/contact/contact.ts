import { afterNextRender, Component, inject, Injector, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ContactForm } from './components/contact-form/contact-form/contact-form';
import { FreeDiagnosis } from './components/free-diagnosis/free-diagnosis/free-diagnosis';
import { ConfirmLeaveDialog } from '../../shared/ui/confirm-leave-dialog/confirm-leave-dialog';
import { LeaveConfirmable } from '../../core/guards/unsaved-form-guard';

type ContactIntent = 'message' | 'diagnosis' | '';

@Component({
  selector: 'app-contact',
  imports: [ContactForm, FreeDiagnosis, ConfirmLeaveDialog],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  host: { '(window:beforeunload)': 'onBeforeUnload($event)' },
})
export class Contact implements LeaveConfirmable {
  private readonly injector = inject(Injector);
  private readonly contactForm = viewChild(ContactForm);
  private readonly diagnosisForm = viewChild(FreeDiagnosis);
  private readonly leaveDialog = viewChild.required(ConfirmLeaveDialog);

  protected readonly intent = signal<ContactIntent>('');

  constructor() {
    inject(ActivatedRoute)
      .queryParamMap.pipe(takeUntilDestroyed())
      .subscribe(async (params) => {
        if (params.get('form') !== 'diagnosis' || this.intent() === 'diagnosis') {
          return;
        }
        if (!(await this.confirmLeave())) {
          return;
        }

        this.intent.set('diagnosis');
        afterNextRender(() => this.scrollToForm(), { injector: this.injector });
      });
  }

  async confirmLeave(): Promise<boolean> {
    return !this.hasUnsavedChanges() || this.leaveDialog().open();
  }

  protected async showForm(intent: ContactIntent): Promise<void> {
    if (intent !== this.intent() && !(await this.confirmLeave())) {
      return;
    }
    this.intent.set(intent);
    this.scrollToForm();
  }

  protected onBeforeUnload(event: BeforeUnloadEvent): void {
    if (this.hasUnsavedChanges()) {
      event.preventDefault();
    }
  }

  private hasUnsavedChanges(): boolean {
    return (
      (this.contactForm()?.hasUnsavedChanges() ?? false) ||
      (this.diagnosisForm()?.hasUnsavedChanges() ?? false)
    );
  }

  private scrollToForm(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }
}
