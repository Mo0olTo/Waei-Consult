import { AbstractControl, ValidationErrors } from "@angular/forms";


//-----FREE DIAGNOSIS---
export type DiagnosisField =
  | 'name'
  | 'company'
  | 'location'
  | 'business'
  | 'problem'
  | 'duration'
  | 'attempted'
  | 'nextStep'
  | 'whatsapp'
  | 'consentDiagnosis'
  | 'consentWhatsapp';

export const WHATSAPP_PATTERN = /^\+[1-9](?:[\s-]?\d){7,14}$/;

export function requiredText(control: AbstractControl<string>): ValidationErrors | null {
  return control.value.trim().length > 0 ? null : { required: true };
} 



//------REGULAR CONTACT----
export type ContactField = 'name' | 'email' | 'phone' | 'company' | 'services' | 'message';

export const PHONE_PATTERN = /^\+?[0-9\s-]{8,15}$/;

export function atLeastOneSelected(control: AbstractControl<string[]>): ValidationErrors | null {
  return control.value.length > 0 ? null : { required: true };
}
