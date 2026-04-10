import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Sidenav } from './sidenav/sidenav';
import { Topbar } from './topbar/topbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, Sidenav, Topbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Dashboard implements OnInit {
  currentUser: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const raw = localStorage.getItem('user');
      if (raw) this.currentUser = JSON.parse(raw);
    }
  }
}