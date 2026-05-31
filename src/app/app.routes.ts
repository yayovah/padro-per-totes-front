import { Routes } from '@angular/router';
import { Login } from './Auth/Components/Login/login';
import { Home } from './Home/Components/Home/home';
import { SuperadminDashboard } from './Home/Components/Superadmin-dashboard/superadmin-dashboard';
import { Ciutats } from './Ciutat/Services/ciutats';
import { CiutatsComponent } from './Ciutat/Components/ciutats/ciutats';
import { authGuard } from './Shared/Guards/auth-guard';
import { AdminDashboard } from './Home/Components/Admin-dashboard/Components/admin-dashboard';
import { Register } from './Auth/Components/Register/register';


export const routes: Routes = [
  //Ruta per defecte que redirigeix a Home
  {
    path: '',
    component: Home,
  },
  //Ruta per acreditar usuàries
  {
    path: 'login',
    component: Login,
  },
  // Ruta per al registre d'administradores
  {
    path: 'registro',
    component: Register,
  },

  //Les següents rutes utilitzen l'authGuard' per protegir-les i només permetre l'accés a usuaris amb el rol necessari
  //Taulell d'Administració
  {
    path: 'adminDash',
    component: AdminDashboard,
    canActivate: [authGuard],
    data: { rolNecessari: 'admin' }
  },
  //Taulell de Superadministració
  {
    path: 'superadminDash',
    component: SuperadminDashboard,
    canActivate: [authGuard],
    data: { rolNecessari: 'superadmin' }
  },
];
