import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiagnosisField, requiredText, WHATSAPP_PATTERN } from '../../../../../shared/constants/contact';
import { DurationOption } from '../../../models/duration-option.model';
import { DiagnosisAccess } from '../../../models/diagnosis-access';

@Component({
  selector: 'app-free-diagnosis',
  imports: [ReactiveFormsModule],
  templateUrl: './free-diagnosis.html',
  styleUrl: './free-diagnosis.scss',
})
export class FreeDiagnosis {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly access = inject(DiagnosisAccess);

  protected readonly submitAttempted = signal(false);
  protected readonly loading = signal(false);
  protected readonly problemLimit = 500;

  protected readonly durations: readonly DurationOption[] = [
    { id: 'under-month', label: 'أقل من شهر' },
    { id: 'one-to-three', label: 'من شهر إلى 3 أشهر' },
    { id: 'three-to-six', label: 'من 3 إلى 6 أشهر' },
    { id: 'over-six', label: 'أكثر من 6 أشهر' },
  ];

  protected readonly outcomes: readonly string[] = [
    'نوع المشكلة أو طبيعتها الأولية.',
    'مجال المشكلة أو مصدرها المحتمل.',
    'درجة الخطورة الأولية: منخفضة / متوسطة / عالية.',
    'ملاحظة مختصرة توضح أهم ما لفت انتباهنا بناءً على المعلومات التي قدمتها.',
    'الخطوة المقترحة التالية إذا كانت المشكلة تحتاج إلى دراسة أو تدخل استشاري أعمق.',
  ];

  protected readonly form = this.formBuilder.group({
    name: ['', [requiredText, Validators.minLength(3), Validators.maxLength(100)]],
    company: ['', [Validators.maxLength(120)]],
    location: ['', [requiredText, Validators.maxLength(120)]],
    business: ['', [requiredText, Validators.maxLength(300)]],
    problem: ['', [requiredText, Validators.maxLength(this.problemLimit)]],
    duration: ['', [Validators.required]],
    attempted: ['', [Validators.maxLength(1000)]],
    nextStep: ['', [requiredText, Validators.maxLength(1000)]],
    whatsapp: ['', [Validators.required, Validators.pattern(WHATSAPP_PATTERN)]],
    consentDiagnosis: [false, [Validators.requiredTrue]],
    consentWhatsapp: [false, [Validators.requiredTrue]],
  });

  protected isInvalid(field: DiagnosisField): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitAttempted());
  }

  protected describedBy(field: DiagnosisField, ...hintIds: string[]): string | null {
    const ids = hintIds.filter((id) => id.length > 0);
    if (this.isInvalid(field)) {
      ids.push(`diagnosis-${field}-error`);
    }
    return ids.length > 0 ? ids.join(' ') : null;
  }

  protected errorMessage(field: DiagnosisField): string {
    const errors = this.form.controls[field].errors;
    if (!errors) return '';
    if (errors['required']) {
      if (field === 'consentDiagnosis' || field === 'consentWhatsapp') {
        return 'يلزم الموافقة للمتابعة';
      }
      if (field === 'duration') return 'يرجى اختيار المدة';
      return 'هذا الحقل مطلوب';
    }
    if (errors['pattern']) return 'يرجى إدخال رقم واتساب مع رمز الدولة، مثل ‎+20 أو ‎+966';
    if (errors['minlength']) return `يجب ألا يقل عن ${errors['minlength'].requiredLength} أحرف`;
    if (errors['maxlength']) return `يجب ألا يزيد عن ${errors['maxlength'].requiredLength} حرفاً`;
    return '';
  }

  protected consentDescribedBy(): string | null {
    const ids: string[] = [];
    if (this.isInvalid('consentDiagnosis')) ids.push('diagnosis-consentDiagnosis-error');
    if (this.isInvalid('consentWhatsapp')) ids.push('diagnosis-consentWhatsapp-error');
    return ids.length > 0 ? ids.join(' ') : null;
  }

  protected onSubmit(): void {
    this.submitAttempted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.access.allow();

    setTimeout(() => {
      this.loading.set(false);
      void this.router.navigate(['/diagnosis-thank-you']);
    }, 3000);
  }
}
