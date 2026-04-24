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
    totalVoters: 0,
    voted: 0,
    notVoted: 0,
    totalCandidates: 0,
  };

  recentActivities: { type: string; title: string; subtitle: string; time: string }[] = [];

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  get participationRate(): number {
    return this.stats.totalVoters > 0
      ? Math.round((this.stats.voted / this.stats.totalVoters) * 100)
      : 0;
  }

  startElection(): void {
    console.log('Starting election...');
  }

  endElection(): void {
    console.log('Ending election...');
  }
}