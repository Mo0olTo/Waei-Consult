import { Component } from '@angular/core';
import { HomeHero } from './components/home-hero/home-hero';

@Component({
  selector: 'app-home',
  imports: [HomeHero],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
