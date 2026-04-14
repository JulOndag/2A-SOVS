import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Candidate {
  id: string;
  name: string;
  position: string;
  party: string;
  status: 'Active' | 'Inactive';
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
export class Candidates {
  // Sample candidates data
  candidates: Candidate[] = [
    {
      id: 'C001',
      name: 'John Smith',
      position: 'President',
      party: 'Unity Party',
      status: 'Active',
      photo: 'https://i.pravatar.cc/150?img=12',
      votes: 342,
      bio: 'Experienced leader with 5 years in student government.'
    },
    {
      id: 'C002',
      name: 'Sarah Johnson',
      position: 'Vice President',
      party: 'Unity Party',
      status: 'Active',
      photo: 'https://i.pravatar.cc/150?img=45',
      votes: 298,
      bio: 'Passionate about student welfare and campus improvement.'
    },
    {
      id: 'C003',
      name: 'Michael Chen',
      position: 'Secretary',
      party: 'Progress Alliance',
      status: 'Active',
      photo: 'https://i.pravatar.cc/150?img=33',
      votes: 215,
      bio: 'Detail-oriented and committed to transparency.'
    },
    {
      id: 'C004',
      name: 'Emily Davis',
      position: 'Treasurer',
      party: 'Progress Alliance',
      status: 'Active',
      photo: 'https://i.pravatar.cc/150?img=47',
      votes: 189,
      bio: 'Finance major with strong budgeting skills.'
    },
    {
      id: 'C005',
      name: 'David Wilson',
      position: 'Auditor',
      party: 'Independent',
      status: 'Inactive',
      photo: 'https://i.pravatar.cc/150?img=51',
      votes: 156,
      bio: 'Independent candidate focused on accountability.'
    },
    {
      id: 'C006',
      name: 'Lisa Anderson',
      position: 'President',
      party: 'Student Voice',
      status: 'Active',
      photo: 'https://i.pravatar.cc/150?img=48',
      votes: 267,
      bio: 'Advocate for student rights and inclusive policies.'
    },
    {
      id: 'C007',
      name: 'James Martinez',
      position: 'Vice President',
      party: 'Student Voice',
      status: 'Active',
      photo: 'https://i.pravatar.cc/150?img=15',
      votes: 234,
      bio: 'Active in campus organizations and community service.'
    }
  ];

  filteredCandidates: Candidate[] = [...this.candidates];
  searchQuery: string = '';
  filterPosition: string = '';

  // Modal state
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentCandidate: Partial<Candidate> = {};

  // Filter candidates
  filterCandidates(): void {
    this.filteredCandidates = this.candidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           candidate.party.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           candidate.id.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesPosition = !this.filterPosition || candidate.position === this.filterPosition;
      
      return matchesSearch && matchesPosition;
    });
  }

  // Open add modal
  openAddModal(): void {
    this.isEditMode = false;
    this.currentCandidate = {
      id: 'C' + String(this.candidates.length + 1).padStart(3, '0'),
      name: '',
      position: '',
      party: '',
      status: 'Active',
      photo: 'https://i.pravatar.cc/150?img=0',
      votes: 0,
      bio: ''
    };
    this.showModal = true;
  }

  // Edit candidate
  editCandidate(candidate: Candidate): void {
    this.isEditMode = true;
    this.currentCandidate = { ...candidate };
    this.showModal = true;
  }

  // Delete candidate
  deleteCandidate(candidate: Candidate): void {
    const message = 'Are you sure you want to delete ' + candidate.name + '?';
    if (confirm(message)) {
      const index = this.candidates.findIndex(c => c.id === candidate.id);
      if (index > -1) {
        this.candidates.splice(index, 1);
        this.filterCandidates();
        console.log('Candidate deleted:', candidate.name);
      }
    }
  }

  // View candidate details
  viewCandidate(candidate: Candidate): void {
    console.log('Viewing candidate:', candidate);
    const details = 'Candidate Details:\n\nName: ' + candidate.name + 
                   '\nPosition: ' + candidate.position + 
                   '\nParty: ' + candidate.party + 
                   '\nVotes: ' + candidate.votes + 
                   '\nStatus: ' + candidate.status + 
                   '\n\nBio: ' + (candidate.bio || 'No bio available');
    alert(details);
  }

  // Save candidate
  saveCandidate(): void {
    if (!this.currentCandidate.name || !this.currentCandidate.position) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.isEditMode) {
      // Update existing candidate
      const index = this.candidates.findIndex(c => c.id === this.currentCandidate.id);
      if (index > -1) {
        this.candidates[index] = this.currentCandidate as Candidate;
        console.log('Candidate updated:', this.currentCandidate);
      }
    } else {
      // Add new candidate
      this.candidates.push(this.currentCandidate as Candidate);
      console.log('Candidate added:', this.currentCandidate);
    }

    this.filterCandidates();
    this.closeModal();
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
    this.currentCandidate = {};
  }
}
