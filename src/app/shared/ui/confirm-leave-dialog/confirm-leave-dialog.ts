import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-leave-dialog',
  templateUrl: './confirm-leave-dialog.html',
})
export class ConfirmLeaveDialog {
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private resolveChoice?: (leave: boolean) => void;

  open(): Promise<boolean> {
    const dialog = this.dialog().nativeElement;
    dialog.returnValue = '';
    dialog.showModal();
    return new Promise((resolve) => (this.resolveChoice = resolve));
  }

  protected onClose(): void {
    this.resolveChoice?.(this.dialog().nativeElement.returnValue === 'leave');
    this.resolveChoice = undefined;
  }
}
