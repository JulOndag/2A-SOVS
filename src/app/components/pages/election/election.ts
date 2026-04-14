import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface IElection {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
  totalVoters: number;
  voted: number;
  totalPositions: number;
}

@Component({
  selector: 'app-election',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './election.html',
  styleUrl: './election.scss',
})
export class Election {
  elections: IElection[] = [
    { id: 'E001', name: 'Student Council Election 2026', description: 'Annual student council election', startDate: '2026-09-01', endDate: '2026-09-05', status: 'active', totalVoters: 1200, voted: 800, totalPositions: 6 },
    { id: 'E002', name: 'Student Council Election 2025', description: 'Annual student council election', startDate: '2025-09-03', endDate: '2025-09-07', status: 'completed', totalVoters: 1100, voted: 920, totalPositions: 6 },
    { id: 'E003', name: 'Mid-year Election 2025', description: 'Special mid-year election', startDate: '2025-02-10', endDate: '2025-02-12', status: 'completed', totalVoters: 980, voted: 710, totalPositions: 3 },
  ];

  // Modal state
  showModal = false;
  isEditMode = false;
  currentElection: Partial<IElection> = {};

  // View modal
  showViewModal = false;
  viewingElection: IElection | null = null;

  // ─── Getters ──────────────────────────────────────────
  get activeElection(): IElection | undefined {
    return this.elections.find(e => e.status === 'active');
  }

  get turnoutPercent(): number {
    const a = this.activeElection;
    return a ? Math.round((a.voted / a.totalVoters) * 100) : 0;
  }

  getTurnout(e: IElection): number {
    return Math.round((e.voted / e.totalVoters) * 100);
  }

  getStatusLabel(status: string): string {
    return { active: 'Active', upcoming: 'Upcoming', completed: 'Completed' }[status] || status;
  }

  // ─── Add ──────────────────────────────────────────────
  openAddModal(): void {
    this.isEditMode = false;
    this.currentElection = {
      id: 'E' + String(this.elections.length + 1).padStart(3, '0'),
      name: '', description: '',
      startDate: '', endDate: '',
      status: 'upcoming',
      totalVoters: 0, voted: 0, totalPositions: 6,
    };
    this.showModal = true;
  }

  // ─── Edit ─────────────────────────────────────────────
  editElection(election: IElection): void {
    this.isEditMode = true;
    this.currentElection = { ...election };
    this.showModal = true;
  }

  // ─── Save ─────────────────────────────────────────────
  saveElection(): void {
    if (!this.currentElection.name?.trim() || !this.currentElection.startDate || !this.currentElection.endDate) {
      Swal.fire({ icon: 'warning', title: 'Missing fields', text: 'Name, Start Date, and End Date are required.', confirmButtonColor: '#2c5282' });
      return;
    }

    if (this.isEditMode) {
      const index = this.elections.findIndex(e => e.id === this.currentElection.id);
      if (index > -1) this.elections[index] = { ...this.currentElection } as IElection;
    } else {
      this.elections.push({ ...this.currentElection } as IElection);
    }

    this.closeModal();
    Swal.fire({ icon: 'success', title: this.isEditMode ? 'Election updated!' : 'Election created!', timer: 1500, showConfirmButton: false });
  }

  // ─── Delete ───────────────────────────────────────────
  deleteElection(election: IElection): void {
    if (election.status === 'active') {
      Swal.fire({ icon: 'error', title: 'Cannot delete', text: 'End the election before deleting it.', confirmButtonColor: '#2c5282' });
      return;
    }
    Swal.fire({
      title: 'Delete election?',
      text: `This will permanently remove "${election.name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
    }).then(result => {
      if (result.isConfirmed) {
        this.elections = this.elections.filter(e => e.id !== election.id);
        Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // ─── Start ────────────────────────────────────────────
  startElection(election: IElection): void {
    if (this.activeElection) {
      Swal.fire({ icon: 'warning', title: 'Another election is active', text: 'End the current active election before starting a new one.', confirmButtonColor: '#2c5282' });
      return;
    }
    Swal.fire({
      title: 'Start election?',
      text: `"${election.name}" will be set to Active.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#48a868',
      confirmButtonText: 'Yes, start it',
    }).then(result => {
      if (result.isConfirmed) {
        const index = this.elections.findIndex(e => e.id === election.id);
        if (index > -1) this.elections[index].status = 'active';
        Swal.fire({ icon: 'success', title: 'Election started!', timer: 1500, showConfirmButton: false });
      }
    });
  }

  // ─── End ──────────────────────────────────────────────
  endElection(election: IElection): void {
    Swal.fire({
      title: 'End election?',
      text: `"${election.name}" will be marked as Completed.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Yes, end it',
    }).then(result => {
      if (result.isConfirmed) {
        const index = this.elections.findIndex(e => e.id === election.id);
        if (index > -1) this.elections[index].status = 'completed';
        Swal.fire({ icon: 'success', title: 'Election ended!', timer: 1500, showConfirmButton: false });
      }
    });
  }

  // ─── View ─────────────────────────────────────────────
  viewElection(election: IElection): void {
    this.viewingElection = election;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.viewingElection = null;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentElection = {};
  }
}