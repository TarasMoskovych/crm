import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { MaterialService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/models';

export const hadleHttpError = (e: HttpErrorResponse) => {
  console.warn(e);
  MaterialService.toast('The site is unable to respond.');
  return throwError(e);
};

export const calculateTotals = (positions: Position[]) => {
  return positions.reduce((acc: number, position: Position) => acc + (position.cost * position.quantity), 0);
};
