import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { InputText } from '../../../Shared/Components/form-controls/input-text/input-text';
import { TextArea } from '../../../Shared/Components/form-controls/text-area/text-area';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { Select } from '../../../Shared/Components/form-controls/select/select';
import { PreguntaDTO } from '../../../Preguntes/Models/pregunta.dto';
import { SituacioDTO } from '../../Model/situacio.dto';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { Situacio } from '../../Services/situacio';
import { Resposta } from '../../../Respostes/Services/resposta';
import { RespostaDTO } from '../../../Respostes/Models/resposta.dto';
//import { selectCiutatIdSeleccionada } from '../../../Ciutat/Selectors/ciutats.selector';
//import { Store } from '@ngrx/store';
//import { AppState } from '../../../app.reducers';
//import { toSignal } from '@angular/core/rxjs-interop';
//import * as AdminDashboardActions from '../../../Home/Components/Admin-dashboard/Actions/adminDashboard.action';
//import { selectPreguntaIdSeleccionada, selectPreguntes, selectSituacioIdSeleccionada, selectSituacions } from '../../../Home/Components/Admin-dashboard/Selectors/adminDashboard.selectors';

@Component({
  selector: 'app-situacio-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    TextArea,
    Select,
    Submit
  ],
  templateUrl: './situacio-form.html',
  styleUrl: './situacio-form.scss',
})
export class SituacioForm {
  //Store
/*   private store = inject(Store<AppState>);
  private preguntes = toSignal(this.store.select(selectPreguntes), { initialValue: [] });
  private situacions = toSignal(this.store.select(selectSituacions), { initialValue: [] });
  
  idPreguntaSeleccionada = toSignal(this.store.select(selectPreguntaIdSeleccionada), { initialValue: null });
  idCiutatSeleccionada = toSignal(this.store.select(selectCiutatIdSeleccionada), { initialValue: null });
  idSituacioSeleccionada = toSignal(this.store.select(selectSituacioIdSeleccionada), { initialValue: null }); */
  private situacioService = inject(Situacio);
  private respostaService = inject(Resposta);
  
  preguntes = signal<PreguntaDTO[]>([]);
  situacions = signal<SituacioDTO[]>([]);
  respostes = signal<RespostaDTO[]>([]);
  totesLesRespostes = signal<RespostaDTO[]>([]);
  
  idPreguntaSeleccionada = input<number | null>(null);
  idCiutatSeleccionada = input<number | null>(null);
  idSituacioSeleccionada = input<number | null>(null);
  
  idRespostaSeleccionada = signal<number | null>(null);

  situacioSeleccionada = computed<SituacioDTO | undefined>(() => {
    return this.situacions().find(situacio => situacio.id === this.idSituacioSeleccionada());
  });

   // Creem l'array de llistables a partir de l'array de ciutats
  preguntesLlistables = computed<LlistableDTO[]>(() => 
    this.preguntes().map((pregunta: PreguntaDTO) => ({
      id: pregunta.id,
      nom: pregunta.text
    }))
  );

  respostesLlistables = computed<LlistableDTO[]>(() => 
    this.respostes().map((resposta: RespostaDTO) => ({
      id: resposta.id,
      nom: resposta.text
    }))
  );

  //elements formulari
  resposta: FormControl;
  seguentPregunta: FormControl;
  situacioForm: FormGroup;

  toggleRespostaFlag = signal<boolean>(false);
  toggleRespostaText = computed<string>(() => {
    return this.toggleRespostaFlag() ? "Seleccionar respuesta existente" : "Añadir nueva respuesta";
  });

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

  ngOnInit(): void {
    this.respostaService.getRespostes().subscribe({
      next: (respostes) => this.totesLesRespostes.set(respostes),
      error: (error) => console.error('Error al obtener las respuestas:', error)
    });
  }

  submit(): void {
    if (this.situacioForm.invalid) {
      this.situacioForm.markAllAsTouched();
      return;
    }
    const dadesResposta = {
      text: this.resposta.value,
    }
    const dadesForm =  {
      seguent_preguntaId: this.seguentPregunta.value,
      ciutatId: this.idCiutatSeleccionada()!,
      preguntaId: this.idPreguntaSeleccionada()!,
    }
    if(this.idSituacioSeleccionada()){
      const dadesSituacio : any =  {
        ...dadesForm,
        id: this.idSituacioSeleccionada()!
      };
      this.situacioService.updateSituacio(dadesSituacio, dadesResposta).subscribe({
        next: (situacioActualitzada) => console.log(situacioActualitzada),
        error: (error) => console.error('Error al actualizar la situacio:', error)
      })
      //this.store.dispatch(AdminDashboardActions.updateSituacio({ dadesSituacio }));
    }
    else{
      this.situacioService.createSituacio(dadesForm, dadesResposta).subscribe({
        next: (situacioCreada) => console.log(situacioCreada),
        error: (error) => console.error('Error al crear la situacio:', error)
      });
      //this.store.dispatch(AdminDashboardActions.createSituacio({ dadesSituacio: dadesForm, resposta: this.resposta.value }));
    }
    
  }

  submitResposta(): void {
    if (this.resposta.invalid) {
      this.resposta.markAsTouched();
      return;
    }
    this.respostaService.createResposta({text: this.resposta.value}).subscribe({
      next: (respostaCreada) => {
        this.idRespostaSeleccionada.set(respostaCreada.id);
        this.totesLesRespostes.update(respostes => [...respostes, respostaCreada]);
      },
      error: (error) => console.error('Error al crear la respuesta:', error)
    });
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere rellenar el campo " + nom;
    }
    return "";
  }

  toggleResposta(): void {
    this.toggleRespostaFlag.set(!this.toggleRespostaFlag());
  }


}
