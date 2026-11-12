import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageMeta } from './core/page-meta';
import { LoadingScreen } from './shared/ui/loading-screen/loading-screen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    // Must be constructed at startup so prerender writes the description into the HTML.
    inject(PageMeta);
  }
}
