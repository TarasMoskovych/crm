import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreModule } from 'src/app/core/core.module';
import { User } from 'src/app/shared/models';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  private token = null;
  private user: User;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({ token }) => this.setToken(token))
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string) {
    if (!token) { return window.localStorage.removeItem('auth-token'); }

    this.token = token;
    window.localStorage.setItem('auth-token', token);
  }

  logout() {
    this.setToken(null);
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

}
