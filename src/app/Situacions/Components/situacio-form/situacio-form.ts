import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { TextArea } from '../../../Shared/Components/form-controls/text-area/text-area';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { Select } from '../../../Shared/Components/form-controls/select/select';
import { PreguntaDTO } from '../../../Preguntes/Models/pregunta.dto';
import { SituacioDTO } from '../../Model/situacio.dto';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { Situacio } from '../../Services/situacio';
import { AdminDashService } from '../../../Home/Services/admin-dash.service';

@Component({
  selector: 'app-situacio-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextArea,
    Select,
    Submit
  ],
  templateUrl: './situacio-form.html',
  styleUrl: './situacio-form.scss',
})
export class SituacioForm {
  private situacioService = inject(Situacio);
  private adminDashService = inject(AdminDashService);
  
  situacions = computed(() => this.adminDashService.situacions());
  respostes = computed(() => this.adminDashService.respostes());
  accioActual = computed(() => this.adminDashService.accioActual());
  
  ciutatSeleccionada = computed(() => this.adminDashService.ciutatSeleccionada());
  idCiutatSeleccionada = computed(() => this.ciutatSeleccionada()?.id ?? null);

  preguntes = computed(() => this.adminDashService.preguntes());
  idPreguntaSeleccionada = computed(() => this.adminDashService.idPreguntaSeleccionada());
  preguntaSeleccionada = computed(() => this.preguntes().find(p => p.id === this.idPreguntaSeleccionada()) ?? null);
  
  idSituacioSeleccionada = computed(()  => this.adminDashService.idSituacioSeleccionada())
  situacioSeleccionada = computed<SituacioDTO | undefined>(() => {
    return this.situacions().find(situacio => situacio.id === this.idSituacioSeleccionada());
  });

   // Creem l'array de llistables a partir de l'array de ciutats
  preguntesLlistables = computed<LlistableDTO[]>(() => 
    this.preguntes().map((pregunta: PreguntaDTO) => ({
      id: pregunta.id,
      nom: pregunta.titol
    }))
  );

  //elements formulari
  resposta: FormControl;
  seguentPregunta: FormControl;
  situacioForm: FormGroup;


constructor(  
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.resposta = new FormControl('', [
      Validators.required
    ]);
    this.seguentPregunta = new FormControl('', [
      Validators.required
    ]);

    //Vinculem els camps al Form
    this.situacioForm = this.formBuilder.group({
      resposta: this.resposta,
      seguentPregunta: this.seguentPregunta,
    });

    //Si volem editar la pregunta, les dades de la ciutat seleccionada es posen al formulari
    effect(() => {
      if(this.situacioSeleccionada()){
        this.situacioForm.patchValue({
          resposta: this.situacioSeleccionada()!.resposta,
          seguentPregunta: this.situacioSeleccionada()!.seguent_pregunta
        })
      }
    });
  }

  submitSituacio(): void {
    if (this.situacioForm.invalid) {
      this.situacioForm.markAllAsTouched();
      return;
    }
    const dades = {
      resposta:{text: this.resposta.value}, 
      situacio:{
        pregunta: this.idPreguntaSeleccionada(),
        ciutat: this.idCiutatSeleccionada(),
        seguent_pregunta: this.seguentPregunta.value
      }
    }
    this.situacioService.createSituacio(dades).subscribe({
      next: (situacioCreada) => {
        //this.adminDashService.idSituacioSeleccionada.set(situacioCreada.id);
        console.log(situacioCreada);
        this.adminDashService.situacions.set([...this.adminDashService.situacions(), situacioCreada]);
        this.adminDashService.accioActual.set('view');
      },
      error: (error) => {
        console.error('Error al crear la respuesta:', error);
      }
    });
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere rellenar el campo " + nom;
    }
    return "";
  }

}
