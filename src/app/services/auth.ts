import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/users';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  login(identifier: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}?email=${identifier}&password=${password}`
    );
  }

  getCurrentUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as User) : null;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  }

  isElecom(): boolean {
    return this.getCurrentUser()?.role === 'elecom';
  }

  isStudent(): boolean {
    return this.getCurrentUser()?.role === 'student';
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  }
}