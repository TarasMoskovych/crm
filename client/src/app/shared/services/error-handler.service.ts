import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { MaterialService } from 'src/app/shared/services';

export const hadleHttpError = (e: HttpErrorResponse) => {
  console.warn(e);
  MaterialService.toast('The site is unable to respond.');
  return throwError(e);
};
