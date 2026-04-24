import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voters.html',
  styleUrl: './voters.scss',
})
export class Voters {}