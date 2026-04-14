import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface Voter {
  id: string;
  name: string;
  email: string;
  course: string;
  year: string;
  status: 'voted' | 'not-voted';
  votedAt: string;
}

@Component({
  selector: 'app-voters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voters.html',
  styleUrl: './voters.scss',
})
export class Voters {
  voters: Voter[] = [
    { id: '2021-00001', name: 'John Doe',    email: 'john@ustp.edu.ph',    course: 'BSIT', year: '3rd', status: 'voted',     votedAt: 'Sept 1, 10:20 AM' },
    { id: '2021-00002', name: 'Jane Smith',  email: 'jane@ustp.edu.ph',    course: 'BSCS', year: '2nd', status: 'not-voted', votedAt: '' },
    { id: '2021-00003', name: 'Maria Cruz',  email: 'maria@ustp.edu.ph',   course: 'BSCE', year: '4th', status: 'voted',     votedAt: 'Sept 1, 11:05 AM' },
    { id: '2021-00004', name: 'Carlo Reyes', email: 'carlo@ustp.edu.ph',   course: 'BSIT', year: '1st', status: 'not-voted', votedAt: '' },
    { id: '2021-00005', name: 'Ana Lim',     email: 'ana@ustp.edu.ph',     course: 'BSME', year: '3rd', status: 'voted',     votedAt: 'Sept 2, 9:14 AM' },
  ];

  filteredVoters: Voter[] = [...this.voters];
  searchQuery = '';
  filterStatus = '';
  filterCourse = '';

  // Modal state
  showModal = false;
  isEditMode = false;
  currentVoter: Partial<Voter> = {};

  // View modal
  showViewModal = false;
  viewingVoter: Voter | null = null;

  // ─── Stats ────────────────────────────────────────────
  get totalVoters()  { return this.voters.length; }
  get totalVoted()   { return this.voters.filter(v => v.status === 'voted').length; }
  get totalPending() { return this.voters.filter(v => v.status === 'not-voted').length; }
  get turnoutPercent() { return this.totalVoters ? Math.round((this.totalVoted / this.totalVoters) * 100) : 0; }

  // ─── Filter ───────────────────────────────────────────
  filterVoters(): void {
    this.filteredVoters = this.voters.filter(v => {
      const matchSearch =
        v.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        v.id.includes(this.searchQuery) ||
        v.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchStatus = !this.filterStatus || v.status === this.filterStatus;
      const matchCourse = !this.filterCourse || v.course === this.filterCourse;
      return matchSearch && matchStatus && matchCourse;
    });
  }

  // ─── Add ──────────────────────────────────────────────
  openAddModal(): void {
    this.isEditMode = false;
    this.currentVoter = {
      id: '', name: '', email: '',
      course: '', year: '',
      status: 'not-voted', votedAt: '',
    };
    this.showModal = true;
  }

  // ─── Edit ─────────────────────────────────────────────
  editVoter(voter: Voter): void {
    this.isEditMode = true;
    this.currentVoter = { ...voter };
    this.showModal = true;
  }

  // ─── Save ─────────────────────────────────────────────
  saveVoter(): void {
    if (!this.currentVoter.name?.trim() || !this.currentVoter.id?.trim()) {
      Swal.fire({ icon: 'warning', title: 'Missing fields', text: 'ID and Name are required.', confirmButtonColor: '#2c5282' });
      return;
    }

    // Check duplicate ID on add
    if (!this.isEditMode && this.voters.find(v => v.id === this.currentVoter.id)) {
      Swal.fire({ icon: 'error', title: 'Duplicate ID', text: 'A voter with this ID already exists.', confirmButtonColor: '#2c5282' });
      return;
    }

    if (this.isEditMode) {
      const index = this.voters.findIndex(v => v.id === this.currentVoter.id);
      if (index > -1) this.voters[index] = { ...this.currentVoter } as Voter;
    } else {
      this.voters.push({ ...this.currentVoter } as Voter);
    }

    this.filterVoters();
    this.closeModal();
    Swal.fire({ icon: 'success', title: this.isEditMode ? 'Voter updated!' : 'Voter added!', timer: 1500, showConfirmButton: false });
  }

  // ─── Delete ───────────────────────────────────────────
  deleteVoter(voter: Voter): void {
    Swal.fire({
      title: 'Delete voter?',
      text: `This will remove ${voter.name} permanently.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
    }).then(result => {
      if (result.isConfirmed) {
        this.voters = this.voters.filter(v => v.id !== voter.id);
        this.filterVoters();
        Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // ─── View ─────────────────────────────────────────────
  viewVoter(voter: Voter): void {
    this.viewingVoter = voter;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.viewingVoter = null;
  }

  // ─── Mark as voted ────────────────────────────────────
  markAsVoted(voter: Voter): void {
    Swal.fire({
      title: 'Mark as voted?',
      text: `Confirm that ${voter.name} has voted.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#48a868',
      confirmButtonText: 'Yes, confirm',
    }).then(result => {
      if (result.isConfirmed) {
        const index = this.voters.findIndex(v => v.id === voter.id);
        if (index > -1) {
          this.voters[index].status = 'voted';
          this.voters[index].votedAt = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
        this.filterVoters();
        Swal.fire({ icon: 'success', title: 'Marked as voted!', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // ─── Export CSV ───────────────────────────────────────
  exportCSV(): void {
    const headers = ['ID', 'Name', 'Email', 'Course', 'Year', 'Status', 'Voted At'];
    const rows = this.voters.map(v => [v.id, v.name, v.email, v.course, v.year, v.status, v.votedAt]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'voters.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  closeModal(): void {
    this.showModal = false;
    this.currentVoter = {};
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}