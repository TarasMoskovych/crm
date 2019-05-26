import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services';
import { MaterialService } from 'src/app/shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.form.disable();
    this.register();
  }

  private register() {
    this.authService.register(this.form.value)
      .pipe(take(1))
      .subscribe(
        () => this.router.navigate(['/login'], { queryParams: { isRegistered: true } }),
        (e) => {
          MaterialService.toast(e.error.message);
          this.form.enable();
        }
      );
  }

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

}
