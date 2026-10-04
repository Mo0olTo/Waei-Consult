import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingScreen } from './shared/ui/loading-screen/loading-screen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
