import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex h-full w-full',
  },
})
export class TestimonialCard {
  readonly name = input.required<string>();
  readonly review = input.required<string>();
  readonly photoSrc = input('');
  readonly photoAlt = input('');
}
