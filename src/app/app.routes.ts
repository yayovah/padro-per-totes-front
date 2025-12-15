import { Routes } from '@angular/router';
import { Login } from './Auth/Components/Login/login';
import { Home } from './Home/Components/Home/home';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { SuperadminDashboard } from './superadmin-dashboard/superadmin-dashboard';

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
    path: 'admin',
    component: AdminDashboard,
  },
  {
    path: 'superadmin',
    component: SuperadminDashboard,
  },
];
