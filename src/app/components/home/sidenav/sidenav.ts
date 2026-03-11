import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {

  constructor(private router: Router) {}

  goToCandidate(): void {
    this.router.navigate(['/candidate']);
  }

  goToResult(): void {
    this.router.navigate(['/result']);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/login']);
  }
}
