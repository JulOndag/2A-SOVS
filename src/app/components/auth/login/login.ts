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
  identifier = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(
    private auth: Auth,
    private router: Router, private Auth: Auth) {}

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
            user.role === 'admin' ? 'Administrator' :
            user.role === 'elecom' ? 'Electoral Commission' :
            user.role === 'student' ? 'Student' :
            'Unknown';

          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: `Welcome, ${roleLabel}!`,
            timer: 1500,
            showConfirmButton: false,
          });

          setTimeout(() => {
            if (user.role === 'admin') {
              this.router.navigate(['/admin']);
            } else if (user.role === 'elecom') {
              this.router.navigate(['/elecom']);
            } else if (user.role === 'student') {
              this.router.navigate(['/student']);
            } else {
              this.router.navigate(['/home']);
            }
          }, 1500);

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