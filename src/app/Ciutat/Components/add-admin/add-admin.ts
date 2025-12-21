import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { Auth } from '../../../Auth/Services/auth';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Select } from '../../../Shared/Components/form-controls/select/select';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { Permis } from '../../Services/permis';
import * as CiutatsAction from '../../Actions/ciutat.action';
import { AppState } from '../../../app.reducers';
import { Store } from '@ngrx/store';

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
  private AuthService = inject(Auth);
  private store = inject(Store<AppState>);
  
  private nousAdmins = signal<any[]>([]);
  nousAdminsLlistables = computed<LlistableDTO[]>(() => 
    this.nousAdmins().map((users) => ({
      id: users.id,
      nom: users.name
    }))
  );

  admin: FormControl;
  addAdminForm: FormGroup;

  @Input() idCiutatSeleccionada: number | null = null;

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
  
  ngOnInit(){
    this.AuthService.getUsersByRol('admin').subscribe(
      (users) => {
        this.nousAdmins.set(users);
      //  console.log(users);
      }
    );   
  }

  submit(){
    if (this.addAdminForm.invalid) {
      this.addAdminForm.markAllAsTouched();
      return;
    }


    console.log('ciutat ',this.idCiutatSeleccionada);
    if(this.idCiutatSeleccionada){
      this.store.dispatch(
        CiutatsAction.addAdminToCiutat(
          { ciutatId: this.idCiutatSeleccionada, adminId: this.admin.value }
        ));
    }

  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere selecciona " + nom;
    }
    return "";
  }
}
