import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SERVICES } from '../services/data/services.data';
import { WaeiLogo } from '../../shared/ui/waei-logo/waei-logo';

type ContactField = 'name' | 'email' | 'phone' | 'company' | 'services' | 'message';

const PHONE_PATTERN = /^\+?[0-9\s-]{8,15}$/;

function atLeastOneSelected(control: AbstractControl<string[]>): ValidationErrors | null {
  return control.value.length > 0 ? null : { required: true };
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, WaeiLogo],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly services = SERVICES;
  protected readonly submitAttempted = signal(false);

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
    control.markAsTouched();
  }

  protected onSubmit(): void {
    this.submitAttempted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log(this.form);
      
      return;
    }

    // No delivery channel exists yet (static site, no backend); wire `payload` to one before launch.
    const payload = this.form.getRawValue();
    console.info('Contact form payload', payload);
  }
}
