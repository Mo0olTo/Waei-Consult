import { RenderMode, ServerRoute } from '@angular/ssr';
import { SERVICES } from './features/services/data/services.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'services/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SERVICES.map((service) => ({ id: service.id }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
