import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = user?.role || '';

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
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
