import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { Home } from './components/home/home';
import { Candidate } from './content/candidates/candidates';
import { Result } from './content/result/result';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: Home },
  { path: 'candidates', component: Candidate },
  { path: 'result', component: Result },
];
