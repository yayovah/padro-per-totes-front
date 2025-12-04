import { Routes } from '@angular/router';
import { Login } from './Auth/Components/Login/login';
import { Home } from './Home/Components/Home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
];
