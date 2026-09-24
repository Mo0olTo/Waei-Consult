import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'واعي | مختبر الشركات',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        title: 'من نحن | واعي',
        loadComponent: () => import('./features/about/about').then((m) => m.About),
      },
      {
        path: 'services',
        title: 'خدماتنا | واعي',
        loadComponent: () =>
          import('./features/services/services').then((m) => m.Services),
      },
      {
        path: 'why-waei',
        title: 'لماذا واعي؟ | واعي',
        loadComponent: () =>
          import('./features/why-waei/why-waei').then((m) => m.WhyWaei),
      },
      {
        path: 'clients',
        title: 'العملاء المستهدفون | واعي',
        loadComponent: () =>
          import('./features/who-we-serve/who-we-serve').then((m) => m.WhoWeServe),
      },
      {
        path: 'contact',
        title: 'تواصل معنا | واعي',
        loadComponent: () =>
          import('./features/contact/contact').then((m) => m.Contact),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
