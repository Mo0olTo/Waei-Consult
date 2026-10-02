import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { findService } from '../../data/services.data';
import { ServiceIcon } from '../service-icon/service-icon';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, ServiceIcon],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
})
export class ServiceDetail {
  private readonly route = inject(ActivatedRoute);

  private readonly serviceId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: this.route.snapshot.paramMap.get('id') },
  );

  protected readonly service = computed(() => findService(this.serviceId()));
}
