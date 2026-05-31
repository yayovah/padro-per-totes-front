import { Component, computed, inject, Input, model, OnInit, output, signal } from '@angular/core';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Select } from '../../../Shared/Components/form-controls/select/select';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { CiutatDTO } from '../../Models/ciutat.dto';
import { Ciutats } from '../../Services/ciutats';
import { Auth } from '../../../Auth/Services/auth';


@Component({
  selector: 'app-select-ciutats',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    Submit
  ],
  templateUrl: './select-ciutats.html',
  styleUrl: './select-ciutats.scss',
})
export class SelectCiutats implements OnInit{

  //Serveis injectats
  private ciutatsService = inject(Ciutats);
  private authService = inject(Auth);

  //Dades de l'usuari
  credentials = computed(() => this.authService.credentials());
  usuariId = computed(() => this.credentials()?.user.id);
  usuariRol = computed(() => this.credentials()?.user.rol);
  
  //Dades de les ciutats
  ciutats = signal<CiutatDTO[]>([]);
  idCiutatSeleccionada = signal<number | null>(null);

  // Creem l'array de llistables a partir de l'array de ciutats
  ciutatsLlistables = computed<LlistableDTO[]>(() => 
    this.ciutats().map((ciutat: CiutatDTO) => ({
      id: ciutat.id,
      nom: ciutat.nom
    }))
  );
  
  // Ciutat seleccionada a partir de l'id seleccionat i el llistat de ciutats
  ciutatSeleccionada = computed<CiutatDTO | undefined>(() => {
    return this.ciutats().find(ciutat => ciutat.id == this.idCiutatSeleccionada());
  });

  // Output per enviar la ciutat seleccionada al component pare
  ciutatOutput = output<CiutatDTO | undefined>();

  // Elements del formulari
  ciutat: FormControl;
  selectCiutatForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.ciutat = new FormControl('', [
      Validators.required
    ]);
    this.selectCiutatForm = this.formBuilder.group({
      ciutat: this.ciutat,
    });
  }

  ngOnInit(): void {
    //Si l'usuari és admin, només es carreguen les ciutats que administra, sinó es carreguen totes les ciutats
    if(this.usuariId() && this.usuariRol() === 'admin'){
      this.ciutatsService.getCiutatsAdministrades(this.usuariId()!).subscribe((ciutats) => {
        this.ciutats.set(ciutats);
      });
    } else {
      this.ciutatsService.getCiutats().subscribe((ciutats) => {
        this.ciutats.set(ciutats);
      });
    }
  }

  submit(){
    // s'emet la ciutat seleccionada al select
    this.idCiutatSeleccionada.set(this.ciutat.value);
    this.ciutatOutput.emit(this.ciutatSeleccionada());
  }

  // Funció per obtenir el missatge d'error del camp de selecció de ciutat
  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere seleccionar " + nom;
    }
    return "";
  }

}
