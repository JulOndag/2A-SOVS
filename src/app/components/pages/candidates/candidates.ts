import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Candidate {
  id: string;
  name: string;
  position: string;
  party: string;
  photo: string;
  votes: number;
  bio?: string;
}

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidates.html',
  styleUrl: './candidates.scss',
})
export class Candidates implements OnInit {
  private url = 'http://localhost:3000/candidates';

  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  searchQuery: string = '';
  filterPosition: string = '';

  showModal: boolean = false;
  isEditMode: boolean = false;
  currentCandidate: Partial<Candidate> = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Candidate[]>(this.url).subscribe(data => {
      this.candidates = data;
      this.filterCandidates();
    });
  }

  filterCandidates(): void {
    this.filteredCandidates = this.candidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           candidate.party.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           candidate.id.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesPosition = !this.filterPosition || candidate.position === this.filterPosition;
      return matchesSearch && matchesPosition;
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentCandidate = {
      id: 'C' + String(this.candidates.length + 1).padStart(3, '0'),
      name: '',
      position: '',
      party: '',
      photo: '',
      votes: 0,
      bio: ''
    };
    this.showModal = true;
  }

  editCandidate(candidate: Candidate): void {
    this.isEditMode = true;
    this.currentCandidate = { ...candidate };
    this.showModal = true;
  }

  deleteCandidate(candidate: Candidate): void {
    if (confirm('Are you sure you want to delete ' + candidate.name + '?')) {
      this.http.delete(`${this.url}/${candidate.id}`).subscribe(() => {
        this.candidates = this.candidates.filter(c => c.id !== candidate.id);
        this.filterCandidates();
      });
    }
  }

  viewCandidate(candidate: Candidate): void {
    const details = 'Candidate Details:\n\nName: ' + candidate.name +
                   '\nPosition: ' + candidate.position +
                   '\nParty: ' + candidate.party +
                   '\nVotes: ' + candidate.votes +
                   '\n\nBio: ' + (candidate.bio || 'No bio available');
    alert(details);
  }

  saveCandidate(): void {
    const name = (this.currentCandidate.name || '').trim();
    const position = (this.currentCandidate.position || '').trim();

    if (!name || !position) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.isEditMode) {
      this.http.put<Candidate>(`${this.url}/${this.currentCandidate.id}`, this.currentCandidate)
        .subscribe(updated => {
          const index = this.candidates.findIndex(c => c.id === updated.id);
          if (index > -1) this.candidates[index] = updated;
          this.filterCandidates();
          this.closeModal();
        });
    } else {
      this.http.post<Candidate>(this.url, this.currentCandidate)
        .subscribe(added => {
          this.candidates.push(added);
          this.filterCandidates();
          this.closeModal();
        });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.currentCandidate = {};
  }
}