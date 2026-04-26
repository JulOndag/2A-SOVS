import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Auth, User } from '../../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})
export class MainLayout implements OnInit {
  isLoginRoute = false;
  sidebarOpen = false;
  isProfileMenuOpen = false;
  unseenCount = 0;
  currentUser: User | null = null;

  private platformId = inject(PLATFORM_ID);

  constructor(public auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.checkRoute();
    this.loadUser();
    this.router.events.subscribe(() => {
      this.checkRoute();
      this.loadUser();
      this.isProfileMenuOpen = false;
    });
  }

  loadUser(): void {
    this.currentUser = this.auth.getCurrentUser();
  }

  checkRoute(): void {
    const url = this.router.url;
    this.isLoginRoute = url === '/login' || url === '/';
  }

  get isElecom(): boolean {
    return this.currentUser?.role === 'elecom';
  }

  get isStudent(): boolean {
    return this.currentUser?.role === 'student';
  }

  getUserName(): string {
    return this.currentUser?.name || 'User';
  }

  getUserInitial(): string {
    return this.currentUser?.name?.charAt(0)?.toUpperCase() || 'U';
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  goToNotifications(): void {
    this.router.navigate(['/elecom-notifications']);
  }

  goToElecomSetting(event: Event): void {
    event.stopPropagation();
    this.isProfileMenuOpen = false;
    this.router.navigate(['/elecom-settings']);
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your session!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7B1C2E',
      cancelButtonColor: '#c0392b',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logout();
        Swal.fire({
          title: 'Logged out!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}