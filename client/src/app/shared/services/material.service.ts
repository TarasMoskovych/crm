import { ElementRef } from '@angular/core';

declare const M: any;

export class MaterialService {
  static toast(message: string) {
    M.toast({
      html: message
    });
  }

  static reinitInputs() {
    M.updateTextFields();
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static initializeModal(ref: ElementRef) {
    return M.Modal.init(ref.nativeElement);
  }

  static initializeTooltip(ref: Element) {
    return M.Tooltip.init(ref);
  }

}
