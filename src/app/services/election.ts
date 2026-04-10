import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Election {
  http: any;
  startElection() {
    return this.http.patch('http://localhost:3000/election/1', {
      status: 'active',
    });
  }

  endElection() {
    return this.http.patch('http://localhost:3000/election/1', {
      status: 'ended',
    });
  }

  getStatus() {
    return this.http.get('http://localhost:3000/election/1');
  }
}
