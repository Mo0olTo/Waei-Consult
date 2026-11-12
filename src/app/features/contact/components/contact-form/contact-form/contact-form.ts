import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder,ReactiveFormsModule,Validators,} from '@angular/forms';
import { SERVICES } from '../../../../services/data/services.data';
import { atLeastOneSelected, ContactField, PHONE_PATTERN } from '../../../../../shared/constants/contact';
import { finalize } from 'rxjs';
import { EmailService } from '../../../../../core/services/Email-Service/email.service';
import { ContactReq } from '../../../../../shared/models/contact-req';

type SendStatus = 'idle' | 'sent' | 'failed';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly emailService = inject(EmailService);

  protected readonly services = SERVICES;
  protected readonly submitAttempted = signal(false);
  protected readonly loading = signal(false);
  protected readonly sendStatus = signal<SendStatus>('idle');

  protected readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    company: ['', [Validators.maxLength(120)]],
    services: this.formBuilder.control<string[]>([], atLeastOneSelected),
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  protected isInvalid(field: ContactField): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitAttempted());
  }

  protected errorMessage(field: ContactField): string {
    const errors = this.form.controls[field].errors;
    if (!errors) return '';
    if (errors['required']) {
      return field === 'services' ? 'يرجى اختيار خدمة واحدة على الأقل' : 'هذا الحقل مطلوب';
    }
    if (errors['email']) return 'يرجى إدخال بريد إلكتروني صحيح';
    if (errors['pattern']) return 'يرجى إدخال رقم هاتف صحيح';
    if (errors['minlength']) return `يجب ألا يقل عن ${errors['minlength'].requiredLength} أحرف`;
    if (errors['maxlength']) return `يجب ألا يزيد عن ${errors['maxlength'].requiredLength} حرفاً`;
    return '';
  }

  protected isServiceSelected(id: string): boolean {
    return this.form.controls.services.value.includes(id);
  }

  protected toggleService(id: string, checked: boolean): void {
    const control = this.form.controls.services;
    const current = control.value;
    control.setValue(checked ? [...current, id] : current.filter((serviceId) => serviceId !== id));
    control.markAsDirty();
    control.markAsTouched();
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  protected onSubmit(): void {
    this.submitAttempted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const contactData: ContactReq = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      company: value.company || '—',
      services: this.serviceTitles(value.services),
      message: value.message,
    };

    this.loading.set(true);
    this.sendStatus.set('idle');

    this.emailService
      .sendContactEmail(contactData)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.sendStatus.set('sent');
          this.form.reset();
          this.submitAttempted.set(false);
        },
        error: (error) => {
          console.error(error);
          this.sendStatus.set('failed');
        },
      });
  }

  private serviceTitles(ids: string[]): string {
    return this.services
      .filter((service) => ids.includes(service.id))
      .map((service) => service.title)
      .join('، ');
  }
}
