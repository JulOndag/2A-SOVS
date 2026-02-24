import { Component } from '@angular/core';
import { Topvar } from './topvar/topvar';
import { Sidenav } from './sidenav/sidenav';

@Component({
  selector: 'app-home',
  imports: [Topvar, Sidenav],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
