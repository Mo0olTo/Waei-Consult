import { Component } from '@angular/core';
import { CarouselHome } from './components/carousel-home/carousel-home';
import { FaqHome } from './components/faq-home/faq-home';
import { HomeHero } from './components/home-hero/home-hero';
import { StrategyFlow } from './components/strategy-flow/strategy-flow';
import { TestimonialsHome } from './components/testimonials-home/testimonials-home';

@Component({
  selector: 'app-home',
  imports: [HomeHero, CarouselHome, StrategyFlow, TestimonialsHome, FaqHome],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
