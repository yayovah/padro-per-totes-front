import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { List } from '../../../Shared/Components/list/list';
import { CiutatDTO } from '../../../Ciutat/Models/ciutat.dto';
import { CommonModule } from '@angular/common';
import { Card } from '../../../Shared/Components/card/card';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { UserDTO } from '../../../Shared/Models/user.dto';
import { ListInCard } from '../../../Shared/Components/list-in-card/list-in-card';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { CiutatForm } from '../../../Ciutat/Components/ciutat-form/ciutat-form';
import { AddAdmin } from '../../../Ciutat/Components/add-admin/add-admin';
import { Ciutats } from '../../../Ciutat/Services/ciutats';


@Component({
  selector: 'app-superadmin-dashboard',
  imports: [List, CommonModule, Card, ListInCard, Submit, CiutatForm, AddAdmin],
  templateUrl: './superadmin-dashboard.html',
  styleUrl: './superadmin-dashboard.scss',
})
export class SuperadminDashboard{

  private ciutats = signal<CiutatDTO[]>([]);
  ciutatSeleccionada = signal<CiutatDTO | null>(null);
  idCiutatSeleccionada = signal<number | null>(null);

  ciutatsService = inject(Ciutats);
  ciutatAdmins = signal<UserDTO[]>([]);

  // Creem l'array de llistables a partir de l'array de ciutats
  ciutatsLlistables = computed<LlistableDTO[]>(() => 
    this.ciutats().map((ciutat: CiutatDTO) => ({
      id: ciutat.id,
      nom: ciutat.nom
    }))
  );

  adminsLlistables = computed<LlistableDTO[]>(() => 
    this.ciutatAdmins().map((admin: UserDTO) => ({
      id: admin.id,
      nom: admin.email
    }))
  );
  
  accioActual= signal<String | null>("");
  addAdmin = signal<boolean>(false);


  handleAccio(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }): void {
    this.accioActual.set(event.type);
    this.idCiutatSeleccionada.set(event.id ?? null);

    if(this.idCiutatSeleccionada()){
      if(this.accioActual() === 'view'){
        this.ciutatsService.getAdminsCiutat(this.idCiutatSeleccionada()!).subscribe({
          next: ((admins) => this.ciutatAdmins.set(admins)),
          error: ((error) => console.error("Error al intentar cargar", error))
        });
      }
      if(this.accioActual() === 'delete'){
        
      }
    }

    if(this.accioActual() === 'add'){
      this.idCiutatSeleccionada.set(null);
    }
  }

  handleAccioAdmins(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }): void {
    if(event.id && event.type === 'delete' && this.idCiutatSeleccionada()){
      this.ciutatsService.deletePermis(this.idCiutatSeleccionada()!, event.id).subscribe({
        next: () => this.ciutatAdmins.update(admins => admins.filter(admin => admin.id !== event.id)),
        error: (error) => console.error("Error al intentar eliminar el permiso", error)
      });
    }
  }

  afegeixAdmin(){
      this.addAdmin.set(true);
  }
}
