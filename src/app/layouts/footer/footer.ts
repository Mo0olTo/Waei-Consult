import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAIN_NAVIGATION } from '../../core/navigation';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly links = MAIN_NAVIGATION;
  protected readonly currentYear = new Date().getFullYear();
}
