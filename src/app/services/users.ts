import { Injectable } from '@angular/core';
import { user } from '../components/models';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private apiUrl = 'http://localhost:3000/users';
  private users: user[] = [];
  http: any;

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  addUser(user: any) {
    return this.http.post('http://localhost:3000/users', user);
  }

  updateUser(id: number, user: any) {
    return this.http.put(`http://localhost:3000/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }
}
