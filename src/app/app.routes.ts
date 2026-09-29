import { Routes } from '@angular/router';
import { serviceDetailTitle, serviceExistsGuard } from './features/services/data/services.data';

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
        loadComponent: () =>
          import('./features/services/services').then((m) => m.Services),
        children: [
          {
            path: '',
            title: 'خدماتنا | واعي',
            loadComponent: () =>
              import('./features/services/components/services-list/services-list').then(
                (m) => m.ServicesList,
              ),
          },
          {
            path: ':id',
            title: serviceDetailTitle,
            canActivate: [serviceExistsGuard],
            loadComponent: () =>
              import('./features/services/components/service-detail/service-detail').then(
                (m) => m.ServiceDetail,
              ),
          },
        ],
      },
      {
        path: 'why-waei',
        title: 'لماذا واعي؟ | واعي',
        loadComponent: () =>
          import('./features/why-waei/why-waei').then((m) => m.WhyWaei),
      },
      {
        path: 'clients',
        title: 'عملاؤنا المستهدفون | واعي',
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
