import { Component } from '@angular/core';
import { CarouselHome } from './components/carousel-home/carousel-home';
import { HomeHero } from './components/home-hero/home-hero';
import { TestimonialsHome } from './components/testimonials-home/testimonials-home';

@Component({
  selector: 'app-home',
  imports: [HomeHero, CarouselHome, TestimonialsHome],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
