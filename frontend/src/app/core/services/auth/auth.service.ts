import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private tokenKey = 'jwt';

  constructor() {
    super();
    this.setBaseUrl('auth');
  }

  login(email: string, password: string) {
    return this.post<{ token: string }, { email: string; password: string }>(
      '/login',
      { email, password },
      () => 'Login failed'
    ).pipe(tap((res) => localStorage.setItem(this.tokenKey, res.token)));
  }

  register(username: string, password: string) {
    return this.post<void, { username: string; password: string }>(
      '/register',
      { username, password },
      () => 'Register failed'
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
