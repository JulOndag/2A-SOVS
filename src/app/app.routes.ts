import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { Dashboard as Home } from './components/home/home';
import { authGuard } from './components/guard/auth-guard';
import { roleGuard } from './components/guard/role-guard-guard';

// User pages
import { Candidate } from './content/candidates/candidates';
import { Result } from './content/result/result';
import { Ballot } from './content/ballot/ballot';

// Admin pages
import { Dashboard } from './content/admin/dashboard/dashboard';
import { ManageCandidates } from './content/admin/manage-candidates/manage-candidates';
import { ManageVoters } from './content/admin/manage-voters/manage-voters';
import { Results } from './content/admin/results/results';
import { Settings } from './content/admin/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // User routes
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'candidates', pathMatch: 'full' },
      { path: 'candidates', component: Candidate },
      { path: 'ballot', component: Ballot },
      { path: 'result', component: Result },
    ]
  },

  // Admin routes
  {
    path: 'admin',
    component: Home,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'candidates', component: ManageCandidates },
      { path: 'voters', component: ManageVoters },
      { path: 'results', component: Results },
      { path: 'settings', component: Settings },
    ]
  },

  { path: '**', redirectTo: 'login' }
];