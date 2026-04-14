import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.scss',
})
export class Admindashboard implements OnInit, OnDestroy {

  stats = {
    totalVoters: 1200,
    voted: 800,
    notVoted: 400,
    totalCandidates: 15,
  };

  recentActivities = [
    { type: 'user',     title: 'New voter registered',          subtitle: 'user123',         time: '10:20 AM' },
    { type: 'vote',     title: '17 votes added to President',   subtitle: '5 minutes ago',   time: '5m'       },
    { type: 'user',     title: 'user789 voted',                 subtitle: 'user789',         time: '10:15 AM' },
    { type: 'election', title: 'Election started',              subtitle: 'Admin action',    time: '9:00 AM'  },
    { type: 'user',     title: 'admin123 logged in',            subtitle: 'admin123',        time: '8:45 AM'  },
  ];

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  get participationRate(): number {
    return Math.round((this.stats.voted / this.stats.totalVoters) * 100);
  }

  startElection(): void {
    console.log('Starting election...');
  }

  endElection(): void {
    console.log('Ending election...');
  }
}