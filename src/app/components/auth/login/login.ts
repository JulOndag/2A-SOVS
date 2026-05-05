import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  host: { style: 'display: block; width: 100%; height: 100vh;' },
})
export class LoginComponent implements OnInit {
  identifier = '';
  password = '';
  error: string | null = null;
  loading = false;

  private platformId = inject(PLATFORM_ID); // ✅ ADDED

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // ✅ wrap in isPlatformBrowser so it only runs in browser, not SSR
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        const role = this.auth.getRole();
        if (role === 'admin') this.router.navigate(['/app/admin-dashboard']);
        else if (role === 'elecom') this.router.navigate(['/app/elecom-dashboard']);
        else if (role === 'student') this.router.navigate(['/app/student-dashboard']);
      }
    }
  }

  login() {
    this.error = null;

    if (!this.identifier || !this.password) {
      this.error = 'Please enter identifier and password';
      return;
    }

    this.loading = true;

    this.auth.login(this.identifier, this.password).subscribe({
      next: (users) => {
        this.loading = false;

        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', 'true');

          const roleLabel =
            user.role === 'admin'
              ? 'Administrator'
              : user.role === 'elecom'
                ? 'Electoral Commission'
                : user.role === 'student'
                  ? 'Student'
                  : 'Unknown';

          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: `Welcome, ${roleLabel}!`,
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            if (user.role === 'admin') {
              this.router.navigate(['/app/admin-dashboard']);
            } else if (user.role === 'elecom') {
              this.router.navigate(['/app/elecom-dashboard']);
            } else if (user.role === 'student') {
              this.router.navigate(['/app/student-dashboard']);
            } else {
              this.router.navigate(['/login']);
            }
          });
        } else {
          this.error = 'Invalid email or password';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'An error occurred during login';
      },
    });
  }
}
