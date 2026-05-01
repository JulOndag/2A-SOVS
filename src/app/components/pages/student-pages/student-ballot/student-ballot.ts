import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectionService, Election, Voter } from '../../../../services/election';
import { Auth } from '../../../../services/auth';
import { FormsModule } from '@angular/forms';

export interface Candidate {
  id: string;
  name: string;
  party: string;
  course?: string;
  year?: number;
}

export interface BallotPosition {
  name: string;
  candidates: Candidate[];
}

@Component({
  selector: 'app-student-ballot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-ballot.html',
  styleUrl: './student-ballot.scss',
})
export class StudentBallot implements OnInit {
  election: Election | null = null;
  positions: BallotPosition[] = [];
  voter: Voter | null = null;
  votes: Record<string, string> = {};
  loading: boolean = true;
  submitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: ElectionService,
    public auth: Auth
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const user = this.auth.getCurrentUser();

    if (!id || !user) {
      this.loading = false;
      return;
    }

    const numericId = Number(id); // ✅ FIX HERE

    // Load election
    this.svc.getElections(numericId).subscribe((elections: Election[]) => {
      this.election = elections.find((e) => e.id === numericId) ?? null;
    });

    // Load voter
    this.svc.getVoterByStudentId(user.email).subscribe((voters: Voter[]) => {
      this.voter = voters[0] ?? null;
    });

    // Load candidates
    (this.svc as any).getCandidatesByElection(numericId).subscribe((candidates: any[]) => {
      const positionMap = new Map<string, Candidate[]>();

      candidates.forEach((c: any) => {
        if (!positionMap.has(c.position)) {
          positionMap.set(c.position, []);
        }

        positionMap.get(c.position)!.push({
          id: String(c.id), // ✅ ensure string
          name: c.name,
          party: c.party,
          course: c.course,
          year: c.year,
        });
      });

      this.positions = Array.from(positionMap.entries()).map(
        ([name, cands]) => ({ name, candidates: cands })
      );

      this.loading = false;
    });
  }

  get hasVoted(): boolean {
    return this.voter?.hasVoted ?? false;
  }

  get totalPositions(): number {
    return this.positions.length;
  }

  get answeredCount(): number {
    return Object.keys(this.votes).length;
  }

  get progressPercent(): number {
    return this.totalPositions
      ? (this.answeredCount / this.totalPositions) * 100
      : 0;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  selectCandidate(position: string, candidateId: string): void {
    if (this.hasVoted) return;

    if (this.votes[position] === candidateId) {
      const updated = { ...this.votes };
      delete updated[position];
      this.votes = updated;
    } else {
      this.votes = { ...this.votes, [position]: candidateId };
    }
  }

  submitBallot(): void {
    if (this.answeredCount < this.totalPositions || !this.election) return;

    this.submitting = true;

    (this.svc as any).submitVote(this.election.id, this.votes).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/student-results']);
      },
      error: () => {
        this.submitting = false;
        alert('Something went wrong. Please try again.');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/student-elections']);
  }

  goToResults(): void {
    this.router.navigate(['/student-results']);
  }
}