import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Candidate {
  id: string;
  name: string;
  position: string;
  party: string;
  photo: string;
  votes: number;
  bio: string;
  course?: string;
  year?: string;
  status?: 'pending' | 'approved' | 'disqualified';
  requirements?: {
    enrollment: boolean;
    goodMoral: boolean;
    residency: boolean;
    coc: boolean;
    noViolations: boolean;
    noFailingGrades: boolean;
  };
}

export interface Voter {
  id: number;
  studentId: string;
  name: string;
  course: string;
  year: string;
  hasVoted: boolean;
  verifiedAt: string | null;
}

export interface Election {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  totalPositions: number;
  totalVoters: number;
  voted: number;
  status: 'upcoming' | 'active' | 'completed';
}

@Injectable({ providedIn: 'root' })
export class ElectionService {
  private base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // ── Candidates ───────────────────────────────────────────────
  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.base}/candidates`);
  }
  addCandidate(c: Omit<Candidate, 'id'>): Observable<Candidate> {
    return this.http.post<Candidate>(`${this.base}/candidates`, c);
  }
  updateCandidate(c: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.base}/candidates/${c.id}`, c);
  }
  deleteCandidate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/candidates/${id}`);
  }

  // ── Voters ───────────────────────────────────────────────────
  getVoters(): Observable<Voter[]> {
    return this.http.get<Voter[]>(`${this.base}/voters`);
  }
  addVoter(v: Omit<Voter, 'id'>): Observable<Voter> {
    return this.http.post<Voter>(`${this.base}/voters`, v);
  }
  updateVoter(v: Voter): Observable<Voter> {
    return this.http.put<Voter>(`${this.base}/voters/${v.id}`, v);
  }
  deleteVoter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/voters/${id}`);
  }

  // ── Elections ────────────────────────────────────────────────
  getElections(): Observable<Election[]> {
    return this.http.get<Election[]>(`${this.base}/elections`);
  }
  addElection(e: Omit<Election, 'id'>): Observable<Election> {
    return this.http.post<Election>(`${this.base}/elections`, e);
  }
  updateElection(e: Election): Observable<Election> {
    return this.http.put<Election>(`${this.base}/elections/${e.id}`, e);
  }
  deleteElection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/elections/${id}`);
  }
}