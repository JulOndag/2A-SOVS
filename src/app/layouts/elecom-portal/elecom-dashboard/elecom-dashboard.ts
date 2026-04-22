import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elecom-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './elecom-dashboard.html',
  styleUrl: './elecom-dashboard.scss',
})
export class ElecomDashboard implements OnInit, OnDestroy {

  stats = {
    totalVoters: '',
    voted: '',
    notVoted: '',
    totalCandidates: '',
  };

  recentActivities = [
    { type: '',     title: '',          subtitle: '',         time: '' },
  ];

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  get participationRate(): number {
    const totalVoters = Number(this.stats.totalVoters);
    const voted = Number(this.stats.voted);
    return totalVoters > 0 ? Math.round((voted / totalVoters) * 100) : 0;
  }

  startElection(): void {
    console.log('Starting election...');
  }

  endElection(): void {
    console.log('Ending election...');
  }
}