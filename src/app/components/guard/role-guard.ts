import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const requiredRole = route.data['role'];

    if (user.role === requiredRole) {
      return true;
    }

    // redirect if not allowed
    this.router.navigate(['/home']);
    return false;
  }
}
