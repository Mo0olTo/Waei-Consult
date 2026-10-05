import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Whatsapp } from '../../shared/Components/whatsapp/whatsapp';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, Footer, RouterOutlet, Whatsapp],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
