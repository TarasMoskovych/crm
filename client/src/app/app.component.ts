import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.setToken(window.localStorage.getItem('auth-token'));
  }
}
