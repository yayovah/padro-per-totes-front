import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from '../../Auth/Services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth); //Injecció del servei Auth per accedir a les credencials i al rol de l'usuari
  const rolNecessari = route.data['rolNecessari'];  //S'agafa el rol necessari de la ruta

  //Si l'usuari no compleix els requisits d'autenticació, s'envia al Login
  if (!authService.userRol() || authService.userRol() !== rolNecessari) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
  return true;

};
