import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { AuthGuard } from './components/guard/auth.guard';
import { RoleGuard } from './components/guard/role-guard';
import { ElecomNotif } from './layouts/elecom-portal/elecom-notif/elecom-notif';
import { ElecomSettings } from './layouts/elecom-portal/elecom-settings/elecom-settings';
import { Candidates } from './components/pages/elecom-pages/candidates/candidates';
import { Elections } from './components/pages/elecom-pages/election/election';
import { Results } from './components/pages/elecom-pages/results/results';
import { Voters } from './components/pages/elecom-pages/voters/voters';
import { ElecomDashboard } from './layouts/elecom-portal/elecom-dashboard/elecom-dashboard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'elecom-dashboard',     component: ElecomDashboard, canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-voters',        component: Voters,       canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-candidates',    component: Candidates,   canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-elections',     component: Elections,     canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-results',       component: Results,      canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-notifications', component: ElecomNotif,  canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-settings',      component: ElecomSettings, canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },

  { path: '**', redirectTo: 'login' },
];