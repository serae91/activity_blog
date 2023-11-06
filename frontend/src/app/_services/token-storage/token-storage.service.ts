import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private readonly AUTH_KEY = 'id_token';

  setAuthToken(token: string): void {
    localStorage.setItem(this.AUTH_KEY, token);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }
}