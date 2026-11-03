import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DiagnosisAccess {
  readonly submitted = signal(false);

  allow(): void {
    this.submitted.set(true);
  }
}
