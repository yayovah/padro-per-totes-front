import { Routes } from '@angular/router';
import { Login } from './Auth/Components/Login/login';
import { Home } from './Home/Components/Home/home';
import { AdminDashboard } from './Admin-dashboard/admin-dashboard';
import { SuperadminDashboard } from './Ciutat/Components/Superadmin-dashboard/superadmin-dashboard';
import { Ciutats } from './Ciutat/Services/ciutats';
import { CiutatsComponent } from './Ciutat/Components/ciutats/ciutats';
import { authGuard } from './Shared/Guards/auth-guard';


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
    path: 'userDash',
    component: CiutatsComponent,
  },
  {
    path: 'adminDash',
    component: AdminDashboard,
    canActivate: [authGuard],
    data: { rolNecessari: 'admin' }
  },
  {
    path: 'superadminDash',
    component: SuperadminDashboard,
    canActivate: [authGuard],
    data: { rolNecessari: 'superadmin' }
  },
];
