import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CiutatDTO } from '../../Ciutat/Models/ciutat.dto';
import { UserDTO } from '../../Auth/Model/auth.dto';
import { LlistableDTO } from '../../Shared/Models/llistable.dto';

@Injectable({
  providedIn: 'root',
})
export class SuperadminDashService {
  ciutats = signal<CiutatDTO[]>([]);
  idCiutatSeleccionada = signal<number | null>(null);
  ciutatSeleccionada = computed(() => this.ciutats().find((ciutat) => ciutat.id === this.idCiutatSeleccionada()));
  
  admins = signal<UserDTO[]>([]);
  ciutatAdmins = signal<UserDTO[]>([]);
  
  accioActual= signal<String | null>("");  

  constructor(){
    effect(()=> {
        //this.monitor(); //Descomentar per monitoritzr l'estat del servei
      }
    )
  }

  // Funció per monitoritzar l'estat del servei
  monitor(){
      console.log("---------------- SUPERADMIN SERVICE -------------");
      console.log("ciutatSeleccionada ", this.ciutatSeleccionada());
      console.log("idCiutatSeleccionada ", this.idCiutatSeleccionada());
      console.log("accioActual ", this.accioActual());
      console.log("ciutatAdmins ", this.ciutatAdmins());
      console.log("ciutats ", this.ciutats());
      console.log("admins ", this.admins());
      console.log("---------------- FINAL SERVICE ------------------");  
  }
}
