import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { Home } from './components/home/home';
import { Candidates } from './content/candidates/candidates';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: Home },
  { path: 'candidates', component: Candidates },
];
