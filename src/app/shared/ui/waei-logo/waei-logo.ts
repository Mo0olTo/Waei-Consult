import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type WaeiLogoSize = 'sm' | 'md' | 'lg' | '5xl';
export type WaeiLogoTone = 'primary' | 'inverse';

@Component({
  selector: 'app-waei-logo',
  imports: [RouterLink],
  templateUrl: './waei-logo.html',
  styleUrl: './waei-logo.scss',
  host: {
    class: 'inline-flex',
  },
})
export class WaeiLogo {
  readonly link = input('/');
  readonly size = input<WaeiLogoSize>('md');
  readonly tone = input<WaeiLogoTone>('primary');
}
