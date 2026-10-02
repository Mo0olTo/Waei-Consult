import { Component, input } from '@angular/core';
import { ServiceIconName } from '../../data/services.data';

@Component({
  selector: 'app-service-icon',
  templateUrl: './service-icon.html',
  styleUrl: './service-icon.scss',
})
export class ServiceIcon {
  readonly name = input.required<ServiceIconName>();
}
