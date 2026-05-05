import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export type UserRole = 'admin' | 'elecom' | 'student';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}&password=${password}`);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getRole(): UserRole | null {
    return this.getCurrentUser()?.role ?? null;
  }

  redirectByRole(role: UserRole): void {
    const routeMap: Record<UserRole, string> = {
      admin: '/admin-dashboard',
      elecom: '/elecom-dashboard',
      student: '/student-dashboard',
    };
    this.router.navigate([routeMap[role]]);
  }
}
