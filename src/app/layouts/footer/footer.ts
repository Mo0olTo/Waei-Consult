import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAIN_NAVIGATION } from '../../core/navigation';

interface SocialLink {
  icon: 'instagram' | 'facebook' | 'linkedin' | 'whatsapp' | 'tiktok';
  href: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly links = MAIN_NAVIGATION.filter((link) =>
    ['/', '/about', '/services', '/why-waei'].includes(link.path),
  );
  protected readonly currentYear = new Date().getFullYear();
  // URLs are placeholders until the official profile links are provided.
  protected readonly socialLinks: SocialLink[] = [
    { icon: 'instagram', href: '#', label: 'إنستغرام' },
    { icon: 'facebook', href: '#', label: 'فيسبوك' },
    { icon: 'linkedin', href: '#', label: 'لينكدإن' },
    { icon: 'whatsapp', href: 'https://wa.me/201061510041', label: 'واتساب' },

  ];
}
