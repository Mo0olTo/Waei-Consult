import { CanDeactivateFn } from '@angular/router';

export interface LeaveConfirmable {
  confirmLeave(): Promise<boolean> | boolean;
}

export const unsavedFormGuard: CanDeactivateFn<LeaveConfirmable> = (component) =>
  component.confirmLeave();
