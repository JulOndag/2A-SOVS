import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userStr = localStorage.getItem('user');
    
    // No user in storage at all
    if (!userStr) {
      this.router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userStr);
    const requiredRole = route.data['role'];

    if (user.role === requiredRole) {
      return true;
    }

    if (user.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (user.role === 'elecom') {
      this.router.navigate(['/elecom-dashboard']);
    } else if (user.role === 'student') {
      this.router.navigate(['/student-dashboard']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}