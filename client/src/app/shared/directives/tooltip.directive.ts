import { Directive, ElementRef, OnDestroy } from '@angular/core';

import { MaterialService } from 'src/app/shared/services';
import { Tooltip } from 'src/app/shared/models';
@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {
  tooltip: Tooltip;

  constructor(ref: ElementRef) {
    this.tooltip = MaterialService.initializeTooltip(ref);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
  }

}
