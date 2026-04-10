import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contents',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './contents.html',
  styleUrls: ['./contents.scss'],
})
export class Contents {}
