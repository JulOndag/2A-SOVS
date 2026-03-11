import { Component } from '@angular/core';
import { Sidenav } from "./sidenav/sidenav";
import { Topbar } from "./topbar/topbar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [Sidenav, Topbar, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
