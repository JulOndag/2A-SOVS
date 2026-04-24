import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidenav } from './sidenav/sidenav';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Sidenav, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}