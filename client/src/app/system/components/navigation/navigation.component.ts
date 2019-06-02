import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  links = [
    {
      url: '/overview',
      name: 'Overview'
    },
    {
      url: '/analytics',
      name: 'Analytics'
    },
    {
      url: '/history',
      name: 'History'
    },
    {
      url: '/order',
      name: 'Create Order'
    },
    {
      url: '/categories',
      name: 'Products'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.router.navigate(['/login'], {
      queryParams: {
        logout: true
      }
    });
    this.authService.logout();
  }

}
