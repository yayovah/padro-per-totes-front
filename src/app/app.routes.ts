import { Routes } from '@angular/router';
import { Login } from './Auth/Components/Login/login';
import { Home } from './Home/Components/Home/home';
import { AdminDashboard } from './Admin-dashboard/admin-dashboard';
import { SuperadminDashboard } from './Superadmin-dashboard/superadmin-dashboard';
import { Ciutats } from './Ciutat/Services/ciutats';
import { CiutatsComponent } from './Ciutat/ciutats/ciutats';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'ciutats',
    component: CiutatsComponent,
  },
  {
    path: 'admin',
    component: AdminDashboard,
    //canActivate: [AuthGuard],
  },
  {
    path: 'superadmin',
    component: SuperadminDashboard,
    //canActivate: [AuthGuard],
  },
];
