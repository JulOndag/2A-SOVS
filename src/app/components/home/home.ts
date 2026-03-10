import { Component } from '@angular/core';
import { Sidenav } from "./sidenav/sidenav";
import { Topbar } from "./topbar/topbar";

@Component({
  selector: 'app-home',
  imports: [Sidenav, Topbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
