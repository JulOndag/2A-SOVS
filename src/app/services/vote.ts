import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Vote {
  constructor(private http: HttpClient) {}

  submitVote(vote: any) {
    return this.http.post('http://localhost:3000/votes', vote);
  }

  getVotes() {
    return this.http.get('http://localhost:3000/votes');
  }

  checkVoteStatus(user: { alreadyVoted: boolean }) {
    if (user.alreadyVoted) {
      alert('You have already voted!');
      return;
    }
  }
}
