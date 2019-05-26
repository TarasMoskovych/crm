import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services';
import { MaterialService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkActions();
    this.buildForm();
  }

  onSubmit() {
    this.form.disable();
    this.login();
  }

  private checkActions() {
    const params = this.route.snapshot.params;
    let message = null;

    if (params['isRegistered']) {
      message = 'You can log in system.';
    }

    if (params['accessDenied']) {
      message = 'Please, authorize.';
    }

    if (params['sessionExpired']) {
      message = 'Session expired. Please, log in again.';
    }

    if (message) {
      MaterialService.toast(message);
    }
  }

  private login() {
    this.authService.login(this.form.value)
    .pipe(take(1))
    .subscribe(
      () => this.router.navigate(['/overview']),
      (e) => {
        MaterialService.toast(e.error.message);
        this.form.enable();
      }
   );
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

}
