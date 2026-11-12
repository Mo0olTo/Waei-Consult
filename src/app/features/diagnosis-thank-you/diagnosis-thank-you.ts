import { Component, inject, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { DiagnosisAccess } from '../contact/models/diagnosis-access';

@Component({
  selector: 'app-diagnosis-thank-you',
  imports: [RouterLink],
  templateUrl: './diagnosis-thank-you.html',
  styleUrl: './diagnosis-thank-you.scss',
})
export class DiagnosisThankYou implements OnDestroy {
  private readonly access = inject(DiagnosisAccess);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  protected readonly allowed = this.access.submitted;

  constructor() {
    this.meta.updateTag({ name: 'robots', content: 'noindex' });

    if (!this.access.submitted()) {
      void this.router.navigate(['/contact'], {
        queryParams: { form: 'diagnosis' },
        replaceUrl: true,
      });
    }
  }

  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }
}
