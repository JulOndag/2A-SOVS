import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { HomeComponent } from './components/home/home';

// Guards
import { AuthGuard } from './components/guard/auth.guard';
import { RoleGuard } from './components/guard/role-guard';

// USER PAGES
import { Election } from './components/pages/election/election';
import { Candidates } from './components/pages/candidates/candidates';
import { Results } from './components/pages/results/results';

// ADMIN PAGES
import { Admindashboard } from './components/pages/admindashboard/admindashboard';
import { Voters } from './components/pages/voters/voters';
import { Activitylogs } from './components/pages/activitylogs/activitylogs';

export const routes: Routes = [
  // default redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // login
  { path: 'login', component: LoginComponent },

  // =========================
  // USER ROUTES (HOME LAYOUT)
  // =========================
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'election', pathMatch: 'full' },

      { path: 'election', component: Election },
      { path: 'candidates', component: Candidates },
      { path: 'results', component: Results },
    ],
  },

  // =========================
  // ADMIN ROUTES (ADMIN LAYOUT)
  // =========================
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: Admindashboard },
      { path: 'voters', component: Voters },
      { path: 'activitylogs', component: Activitylogs },
      { path: 'candidates', component: Candidates },
      { path: 'results', component: Results },
    ],
  },

  // fallback
  { path: '**', redirectTo: 'home' },
];
