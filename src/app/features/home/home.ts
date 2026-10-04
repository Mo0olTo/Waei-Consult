import { Component } from '@angular/core';
import { CarouselHome } from './components/carousel-home/carousel-home';
import { HomeHero } from './components/home-hero/home-hero';

@Component({
  selector: 'app-home',
  imports: [HomeHero, CarouselHome],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
