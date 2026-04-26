import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ElectionService, Election } from '../../../services/election';

export interface Activity {
  type: 'user' | 'vote' | 'election' | 'candidate' | 'warning';
  title: string;
  subtitle: string;
  time: string;
}

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
    approvedCandidates: 0,
    pendingCandidates: 0
  };

  activeElection: Election | null = null;
  showConfirmModal = false;
  confirmAction: 'start' | 'end' | null = null;

  recentActivities: Activity[] = [
    { type: 'vote',      title: 'New vote cast',       subtitle: 'Anonymous voter — ballot submitted',  time: '11:30 AM' },
    { type: 'candidate', title: 'Candidate approved',  subtitle: 'Maria Santos — President',            time: '10:45 AM' },
    { type: 'user',      title: 'Voter verified',      subtitle: 'Student ID 2023-0005 cleared',        time: '10:02 AM' },
    { type: 'election',  title: 'Election configured', subtitle: '7 positions set up by ELECOM',        time: '08:00 AM' },
  ];

  constructor(private svc: ElectionService, private router: Router) {}

  ngOnInit(): void { this.loadStats(); }
  ngOnDestroy(): void {}

  loadStats(): void {
    this.svc.getVoters().subscribe(voters => {
      this.stats.totalVoters = voters.length;
      this.stats.voted       = voters.filter(v => v.hasVoted).length;
      this.stats.notVoted    = this.stats.totalVoters - this.stats.voted;
    });

    this.svc.getCandidates().subscribe(candidates => {
      this.stats.totalCandidates    = candidates.length;
      this.stats.approvedCandidates = candidates.filter(c => c.status === 'approved').length;
      this.stats.pendingCandidates  = candidates.filter(c => c.status === 'pending').length;
    });

    this.svc.getElections().subscribe(elections => {
      this.activeElection = elections.find(e => e.status === 'active') || null;
    });
  }

  get participationRate(): number {
    return this.stats.totalVoters > 0
      ? Math.round((this.stats.voted / this.stats.totalVoters) * 100) : 0;
  }

  get statusLabel(): string {
    return this.activeElection ? 'Active' : 'No Active Election';
  }

  get statusClass(): string {
    return this.activeElection ? 'status-active' : 'status-pending';
  }

  promptStart(): void { this.confirmAction = 'start'; this.showConfirmModal = true; }
  promptEnd(): void   { this.confirmAction = 'end';   this.showConfirmModal = true; }

  confirmElectionAction(): void {
    if (!this.activeElection) return;
    const updated: Election = {
      ...this.activeElection,
      status: this.confirmAction === 'end' ? 'completed' : 'active'
    };
    this.svc.updateElection(updated).subscribe(() => {
      this.addActivity(
        'election',
        this.confirmAction === 'end' ? 'Election ended' : 'Election started',
        this.confirmAction === 'end' ? 'Results are being tallied' : 'Voting is now open',
        this.nowStr()
      );
      this.loadStats();
    });
    this.showConfirmModal = false;
    this.confirmAction = null;
  }

  addActivity(type: Activity['type'], title: string, subtitle: string, time: string): void {
    this.recentActivities.unshift({ type, title, subtitle, time });
    if (this.recentActivities.length > 10) this.recentActivities.pop();
  }

  nowStr(): string {
    return new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
  }

  goTo(path: string): void { this.router.navigate([path]); }
}