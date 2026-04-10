import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar';
import { Sidenav } from './sidenav/sidenav';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TopbarComponent, Sidenav, RouterModule, RouterOutlet],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  isOpen = false;
  role = localStorage.getItem('role') || 'admin';
  currentTime = '';

  constructor(private router: Router) {
    this.updateTime();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  updateTime() {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }, 1000);
  }
}
