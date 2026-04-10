import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss'],
})
export class Sidenav {
  constructor(private router: Router) {}

  logout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}
