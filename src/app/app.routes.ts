import { Routes } from '@angular/router';
import {
  serviceDetailDescription,
  serviceDetailTitle,
  serviceExistsGuard,
} from './features/services/data/services.data';

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
        data: {
          description:
            'واعي مختبر شركات. استشارات وحوكمة ودعم لاتخاذ القرار، لنقل المؤسسات من معالجة المشكلات إلى قرارات استباقية تدعم النمو والاستدامة.',
        },
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        title: 'من نحن | واعي',
        data: {
          description:
            'تعرّف على واعي: الرؤية والرسالة والهدف، ومنهجية استشارية تُبنى على طبيعة النشاط وحجم المؤسسة والتحليل العملي والبيانات.',
        },
        loadComponent: () => import('./features/about/about').then((m) => m.About),
      },
      {
        path: 'crew',
        title: 'فريق عمل واعي | واعي',
        data: {
          description:
            'فريق واعي: هيثم أحمد عمرو، المؤسس والرئيس التنفيذي، وهيثم محمد الشريف، رئيس القطاع القانوني والامتثال والتأسيس.',
        },
        loadComponent: () => import('./features/crew/crew').then((m) => m.Crew),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/services/services').then((m) => m.Services),
        children: [
          {
            path: '',
            title: 'خدماتنا | واعي',
            data: {
              description:
                'ستة مجالات: الاستشارات وتطوير الأعمال، دعم القرار بالبيانات، الحوكمة، الامتثال، تطوير رأس المال البشري، وإدارة المخاطر واستمرارية الأعمال.',
            },
            loadComponent: () =>
              import('./features/services/components/services-list/services-list').then(
                (m) => m.ServicesList,
              ),
          },
          {
            path: ':id',
            title: serviceDetailTitle,
            resolve: { description: serviceDetailDescription },
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
        data: {
          description:
            'منهجية مبنية على البيانات، شراكة من التأسيس حتى الاستدامة، فهم لسوق مصر والخليج بمعايير دولية، وانتقال من رد الفعل إلى الاستباق.',
        },
        loadComponent: () =>
          import('./features/why-waei/why-waei').then((m) => m.WhyWaei),
      },
      {
        path: 'clients',
        title: 'عملاؤنا المستهدفون | واعي',
        data: {
          description:
            'واعي يدعم رواد الأعمال، الشركات العائلية، مجالس الإدارات، القيادات التنفيذية، المستثمرين، والقطاعات التخصصية.',
        },
        loadComponent: () =>
          import('./features/who-we-serve/who-we-serve').then((m) => m.WhoWeServe),
      },
      {
        path: 'contact',
        title: 'تواصل معنا | واعي',
        data: {
          description:
            'أرسل طلب استشارة إلى واعي في الاستشارات، الحوكمة، أو دعم اتخاذ القرار.',
        },
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
