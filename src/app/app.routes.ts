import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { AuthGuard } from './components/guard/auth.guard';
import { RoleGuard } from './components/guard/role-guard';

// ELECOM
import { ElecomDashboard } from './layouts/elecom-portal/elecom-dashboard/elecom-dashboard';
import { ElecomNotif } from './layouts/elecom-portal/elecom-notif/elecom-notif';
import { ElecomSettings } from './layouts/elecom-portal/elecom-settings/elecom-settings';
import { Candidates } from './components/pages/elecom-pages/candidates/candidates';
import { Elections } from './components/pages/elecom-pages/election/election';
import { Results } from './components/pages/elecom-pages/results/results';
import { Voters } from './components/pages/elecom-pages/voters/voters';

// STUDENT
import { StudentDashboard } from './layouts/student-portal/student-dashboard/student-dashboard';
import { StudentResults } from './components/pages/student-pages/student-results/student-results';
import { StudentCandidates } from './components/pages/student-pages/student-candidates/student-candidates';
import { StudentApply } from './components/pages/student-pages/student-apply/student-apply';    

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // ELECOM ROUTES
  { path: 'elecom-dashboard',     component: ElecomDashboard, canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-voters',        component: Voters,          canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-candidates',    component: Candidates,      canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-elections',     component: Elections,       canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-results',       component: Results,         canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-notifications', component: ElecomNotif,     canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },
  { path: 'elecom-settings',      component: ElecomSettings,  canActivate: [AuthGuard, RoleGuard], data: { role: 'elecom' } },

  // STUDENT ROUTES
  { path: 'student-dashboard',    component: StudentDashboard,  canActivate: [AuthGuard, RoleGuard], data: { role: 'student' } },
  { path: 'student-candidates',   component: StudentCandidates, canActivate: [AuthGuard, RoleGuard], data: { role: 'student' } },
  { path: 'student-results',      component: StudentResults,    canActivate: [AuthGuard, RoleGuard], data: { role: 'student' } },
  { path: 'student-apply',        component: StudentApply,      canActivate: [AuthGuard, RoleGuard], data: { role: 'student' } },

  { path: '**', redirectTo: 'login' },
];