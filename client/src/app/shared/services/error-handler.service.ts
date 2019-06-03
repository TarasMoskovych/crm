import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { MaterialService } from 'src/app/shared/services';

export const hadleHttpError = (e: HttpErrorResponse) => {
  MaterialService.toast(e.statusText);
  return throwError(e);
};
