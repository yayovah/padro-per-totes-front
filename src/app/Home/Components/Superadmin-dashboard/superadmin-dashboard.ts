import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { List } from '../../../Shared/Components/list/list';
import { CiutatDTO } from '../../../Ciutat/Models/ciutat.dto';
import { CommonModule } from '@angular/common';
import { Card } from '../../../Shared/Components/card/card';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';

import { ListInCard } from '../../../Shared/Components/list-in-card/list-in-card';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { CiutatForm } from '../../../Ciutat/Components/ciutat-form/ciutat-form';
import { AddAdmin } from '../../../Ciutat/Components/add-admin/add-admin';
import { Ciutats } from '../../../Ciutat/Services/ciutats';
import { SuperadminDashService } from '../../Services/superadmin-dash.service';
import { UserDTO } from '../../../Auth/Model/auth.dto';
import { ModalService } from '../../../Shared/Components/modal/modal.service';


@Component({
  selector: 'app-superadmin-dashboard',
  imports: [List, CommonModule, Card, ListInCard, Submit, CiutatForm, AddAdmin],
  templateUrl: './superadmin-dashboard.html',
  styleUrl: './superadmin-dashboard.scss',
})
export class SuperadminDashboard{
  suepradminDashService = inject(SuperadminDashService);
  ciutatsService = inject(Ciutats);
  modalService = inject(ModalService);

  ciutats = computed(() => this.suepradminDashService.ciutats());
  idCiutatSeleccionada = computed(() =>  this.suepradminDashService.idCiutatSeleccionada());
  ciutatSeleccionada = computed(() =>  this.suepradminDashService.ciutatSeleccionada());
  
  admins = computed(() =>  this.suepradminDashService.admins());
  ciutatAdmins = computed(() =>  this.suepradminDashService.ciutatAdmins());
  
  accioActual = computed(() =>  this.suepradminDashService.accioActual());

  // Creem l'array de llistables a partir de l'array de ciutats
  ciutatsLlistables = computed<LlistableDTO[]>(() => 
    this.ciutats().map((ciutat: CiutatDTO) => ({
      id: ciutat.id,
      nom: ciutat.nom
    }))
  );

  adminsLlistables = computed<LlistableDTO[]>(() => 
    this.ciutatAdmins().map((admin: UserDTO) => ({
      id: admin.id!,
      nom: admin.email!
    }))
  );
  
  constructor(){
    this.ciutatsService.getCiutats().subscribe({
      next: (ciutats) => this.suepradminDashService.ciutats.set(ciutats),
      error: (error) => console.error(error)
    });
  }

  handleAccioCiutats(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }): void {
    this.suepradminDashService.accioActual.set(event.type);
    this.suepradminDashService.idCiutatSeleccionada.set(event.id ?? null);

    //console.log("HANDLE");
    //console.log(this.accioActual());
    //console.log(this.idCiutatSeleccionada());

    if(this.idCiutatSeleccionada()){
      if(this.accioActual() === 'view'){
        this.ciutatsService.getAdminsCiutat(this.idCiutatSeleccionada()!).subscribe({
          next: ((admins) => this.suepradminDashService.ciutatAdmins.set(admins)),
          error: ((error) => console.error("Error al intentar cargar", error))
        });
      }
      if(this.accioActual() === 'delete'){
        this.modalService.showModalEliminar("¿Seguro que quieres eliminar la ciudad?", "Eliminar ciudad").subscribe({
          next: (resultat) => {
            if(resultat){
                this.ciutatsService.deleteCiutat(this.idCiutatSeleccionada()!).subscribe({
                next : (resposta) => {
                  this.modalService.showModalOk("Ciudad eliminada correctamente");
                  this.suepradminDashService.ciutats.update((ciutats) => ciutats.filter((ciutat) => ciutat.id != this.idCiutatSeleccionada()));
                  this.suepradminDashService.idCiutatSeleccionada.set(null);
                },
                error: (error) => this.modalService.showModalError("Error en eliminar la ciudad" + error)
              })
            }
          }
        })
      }
    }

    if(this.accioActual() === 'add'){
      this.suepradminDashService.idCiutatSeleccionada.set(null);
    }
  }

  handleAccioAdmins(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }): void {
    if(event.id && event.type === 'delete' && this.idCiutatSeleccionada()){
      this.modalService.showModalEliminar("¿Seguro que quieres eliminarle de la administración de esta ciudad?", "Eliminar administradora").subscribe({
        next: (resultat) => {
          if(resultat){
            this.ciutatsService.deletePermis(this.idCiutatSeleccionada()!, event.id).subscribe({
              next: () => this.suepradminDashService.ciutatAdmins.update(admins => admins.filter(admin => admin.id !== event.id)),
              error: (error) => console.error("Error al intentar eliminar el permiso", error)
            });
          }
      }});
    }
  }

  afegeixAdmin(){
    this.suepradminDashService.accioActual.set('add');
  }

  actualitzaCiutats(ciutatActualitzada : CiutatDTO){
    console.log("TORNEM DE CREAR O EDITAR");
    const ciutatsAct = this.suepradminDashService.ciutats().filter((ciutat) => ciutat.id !== ciutatActualitzada.id);
    this.suepradminDashService.ciutats.set([...ciutatsAct, ciutatActualitzada]);
    //Actualitzem la vista mostrant la ciutat creada/actualitzada
    this.suepradminDashService.idCiutatSeleccionada.set(ciutatActualitzada.id);
    this.suepradminDashService.accioActual.set('view');
  }
  actualitzaAdmins(nouAdmin : UserDTO){
    const adminsAct = this.suepradminDashService.ciutatAdmins().filter((admin) => admin !== nouAdmin);
    this.suepradminDashService.ciutatAdmins.set([...adminsAct, nouAdmin]);
    this.suepradminDashService.accioActual.set('view');
  }
}
