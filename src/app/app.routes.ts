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

// elecom PAGES
import { Voters } from './components/pages/voters/voters';
import { ElecomNotif } from './layouts/elecom-portal/elecom-notif/elecom-notif';
import { ElecomSettings } from './layouts/elecom-portal/elecom-settings/elecom-settings';
import { Elecom } from './pages/elecom/elecom';

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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'election', component: Election },
      { path: 'candidates', component: Candidates },
      { path: 'results', component: Results },
    ],
  },

  // =========================
  // elecom ROUTES (elecomLAYOUT)
  // =========================
  // =========================
  // Elecom Routes
  // =========================
  { path: 'elecom-dashboard', component: Elecom, canActivate: [AuthGuard], data: { role: 'elecom' } },
  { path: 'elecom-voters', component: Voters, canActivate: [AuthGuard], data: { role: 'elecom' } },
  { path: 'elecom-candidates', component: Candidates, canActivate: [AuthGuard], data: { role: 'elecom' } },
  { path: 'elecom-elections', component: Election, canActivate: [AuthGuard], data: { role: 'elecom' } },
  { path: 'elecom-results', component: Results, canActivate: [AuthGuard], data: { role: 'elecom' } },
  { path: 'elecom-notifications', component: ElecomNotif, canActivate: [AuthGuard], data: { role: 'elecom' } },
  { path: 'elecom-settings', component: ElecomSettings, canActivate: [AuthGuard], data: { role: 'elecom' } },

  // fallback
  { path: '**', redirectTo: 'home' },
];