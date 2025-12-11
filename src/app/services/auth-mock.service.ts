import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  email: string;
  name: string;
  photoUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthMockService {
  private mockUser: User = {
    email: 'test@test.com',
    name: 'Test User',
    photoUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg'
  };

  private _currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this._currentUser.asObservable();

  constructor() {
    this.checkSession();
  }

  private checkSession() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this._currentUser.next(this.mockUser);
    }
  }

  login(email: string, pass: string): Observable<boolean> {
    return of(true).pipe(
      delay(1500),
      tap(() => {
        if (email === this.mockUser.email && pass === '123456') {
          localStorage.setItem('auth_token', 'mock-token-123');
          this._currentUser.next(this.mockUser);
        } else {
          // For simplicity in this mock, we just log in if credentials match hardcoded ones
          // If not, we could throw error or return false.
          // Let's assume success for the correct user, failure otherwise.
          if (email !== this.mockUser.email || pass !== '123456') {
            throw new Error('Invalid credentials');
          }
        }
      })
    );
  }

  register(data: any): Observable<boolean> {
    return of(true).pipe(
      delay(1500),
      tap(() => {
        localStorage.setItem('auth_token', 'mock-token-123');
        this._currentUser.next({ ...this.mockUser, ...data });
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this._currentUser.next(null);
  }

  isAuthenticated(): boolean {
    return !!this._currentUser.value;
  }
}
