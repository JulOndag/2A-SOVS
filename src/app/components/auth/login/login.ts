import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  login() {
    this.error = null;

    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      return;
    }

    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: (users) => {
        this.loading = false;

        if (users.length > 0) {
          const user = users[0];

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', 'true');

          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: `Welcome ${user.role}`,
            timer: 1500,
            showConfirmButton: false,
          });

          setTimeout(() => this.router.navigate(['/home']), 1500);
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
