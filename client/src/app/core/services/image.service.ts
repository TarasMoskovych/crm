import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';

import { CoreModule } from '../core.module';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: CoreModule
})
export class ImageService {
  private channel = new Subject();

  channel$ = this.channel.asObservable();

  uploadFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    fromEvent(reader, 'load')
      .pipe(first())
      .subscribe(() => this.channel.next(reader.result));
  }
}
