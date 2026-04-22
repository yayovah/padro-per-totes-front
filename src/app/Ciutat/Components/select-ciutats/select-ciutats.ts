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

  private ciutatsService = inject(Ciutats);
  private authService = inject(Auth);

  credentials = computed(() => this.authService.credentials());
  usuariId = computed(() => this.credentials()?.user.id);
  usuariRol = computed(() => this.credentials()?.user.rol);
  
  ciutats = signal<CiutatDTO[]>([]);
  idCiutatSeleccionada = signal<number | null>(null);
  // Creem l'array de llistables a partir de l'array de ciutats
  ciutatsLlistables = computed<LlistableDTO[]>(() => 
    this.ciutats().map((ciutat: CiutatDTO) => ({
      id: ciutat.id,
      nom: ciutat.nom
    }))
  );
  
  ciutatSeleccionada = computed<CiutatDTO | undefined>(() => {
    return this.ciutats().find(ciutat => ciutat.id == this.idCiutatSeleccionada());
  });

  ciutatOutput = output<CiutatDTO | undefined>();

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
    this.idCiutatSeleccionada.set(this.ciutat.value);
    this.ciutatOutput.emit(this.ciutatSeleccionada());
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere seleccionar " + nom;
    }
    return "";
  }

}
