import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.scss'],
})
export class TopbarComponent implements OnInit {
  showDropdown = false;
  currentTime: string = '';
  userName: string = 'Admin';
  role: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.role = user?.role || '';
    }

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your session!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {

        // Clear storage
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('user');
          localStorage.removeItem('isLoggedIn');
        }

        // Show success message
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Use Angular routing (correct way)
          this.router.navigate(['/login']);
        });

      }
    });
  }
}