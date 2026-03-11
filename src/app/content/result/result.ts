import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [RouterModule],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result {

  constructor(private router: Router) {}

  back(): void {
    this.router.navigate(['/home']);
  }

}