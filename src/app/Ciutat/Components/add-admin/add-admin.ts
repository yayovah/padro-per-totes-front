import { Component, computed, inject, Input, OnInit, output, signal } from '@angular/core';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { Auth } from '../../../Auth/Services/auth';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Select } from '../../../Shared/Components/form-controls/select/select';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { Permis } from '../../Services/permis';
import { CiutatDTO } from '../../Models/ciutat.dto';
import { UserDTO } from '../../../Auth/Model/auth.dto';
import { ModalService } from '../../../Shared/Components/modal/modal.service';

@Component({
  selector: 'app-add-admin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    Submit
  ],
  templateUrl: './add-admin.html',
  styleUrl: './add-admin.scss',
})
export class AddAdmin implements OnInit{
  // Serveis injectats
  private AuthService = inject(Auth);
  private permisService = inject(Permis);
  private modalService = inject(ModalService);
  
  // Dades dels usuaris administradors
  private nousAdmins = signal<any[]>([]);
  nousAdminsLlistables = computed<LlistableDTO[]>(() => 
    this.nousAdmins().map((users) => ({
      id: users.id,
      nom: users.name
    }))
  );

  // Elements del formulari
  admin: FormControl;
  addAdminForm: FormGroup;

  // Input per rebre la id de la ciutat seleccionada
  @Input() idCiutatSeleccionada: number | null = null;
  
  // Output per enviar el nou admin creat al component pare
  nouAdmin = output<UserDTO>();

  constructor(
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.admin = new FormControl('', [
      Validators.required
    ]);

    this.addAdminForm = this.formBuilder.group({
      admin: this.admin,
    });
  }
  
  //En iniciar el component, obtenim tots els usuaris que son admins per poder-los seleccionar al formulari
  ngOnInit(){
    this.AuthService.getUsersByRol('admin')
      .subscribe((users) => this.nousAdmins.set(users));
      //Falta eliminar tots els que ja son admins de la ciutat
  }

  //Funció per crear un nou admin per la ciutat seleccionada
  submit(){
    if (this.addAdminForm.invalid) {
      this.addAdminForm.markAllAsTouched();
      return;
    }
    if(this.idCiutatSeleccionada){
      this.permisService.createPermis(this.idCiutatSeleccionada, this.admin.value).subscribe({
        next: (permis) => {
          this.modalService.showModalOk("Permiso añadido correctamente");
          this.nouAdmin.emit(permis.user);
        },
        error: (error) => this.modalService.showModalError("Error al intentar añadir el permiso" , error)
      });
    }
  }

  // Funció per mostrar missatges d'error en els camps del formulari
  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere selecciona " + nom;
    }
    return "";
  }
}
