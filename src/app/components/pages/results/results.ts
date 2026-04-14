import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  // Sample data - replace with real data from your service
  positions = [
    {
      title: 'President',
      candidates: [
        { name: 'John Smith', votes: 120, isWinner: true },
        { name: 'Emily Johnson', votes: 95, isWinner: false }
      ]
    },
    {
      title: 'Vice President',
      candidates: [
        { name: 'Alex Brown', votes: 150, isWinner: true },
        { name: 'Sarah Williams', votes: 130, isWinner: false }
      ]
    }
  ];

  getVotePercentage(votes: number, position: any): number {
    const totalVotes = position.candidates.reduce((sum: number, c: any) => sum + c.votes, 0);
    return totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
  }
}
