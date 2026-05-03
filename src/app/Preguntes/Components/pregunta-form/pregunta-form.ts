import { Component, computed, effect, inject, input, output } from '@angular/core';
import { TextArea } from '../../../Shared/Components/form-controls/text-area/text-area';
import { InputText } from '../../../Shared/Components/form-controls/input-text/input-text';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { PreguntaDTO } from '../../Models/pregunta.dto';
import { Pregunta } from '../../Services/pregunta';
import { AdminDashService } from '../../../Home/Services/admin-dash.service';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { Imtages } from '../../../Shared/Services/imtages';
import { Select } from '../../../Shared/Components/form-controls/select/select';

@Component({
  selector: 'app-pregunta-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    TextArea,
    Submit,
    Select
  ],
  templateUrl: './pregunta-form.html',
  styleUrl: './pregunta-form.scss',
})
export class PreguntaForm{
  private preguntaService = inject(Pregunta);
  private adminDashService = inject(AdminDashService);
  private imatgesService = inject(Imtages);
  
  ciutatSeleccionada = computed(() => this.adminDashService.ciutatSeleccionada());
  idCiutatSeleccionada = computed(() => this.ciutatSeleccionada()?.id ?? null);

  preguntes = computed(() => this.adminDashService.preguntes());
  idPreguntaSeleccionada = computed(() => this.adminDashService.idPreguntaSeleccionada());
  preguntaSeleccionada = computed(() => this.preguntes().find(p => p.id === this.idPreguntaSeleccionada()) ?? null);
  
  preguntaActualitzada = output<PreguntaDTO>();

  imatges = computed(() => this.imatgesService.imatgesLlistables());

  titol: FormControl;
  text: FormControl;
  imatge: FormControl;
  preguntaForm: FormGroup;
  
  constructor(  
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.titol = new FormControl('', [
      Validators.required
    ]);
    this.text = new FormControl('', [
      Validators.required
    ]);
    this.imatge = new FormControl('');

    //Vinculem els camps al Form
    this.preguntaForm = this.formBuilder.group({
      titol: this.titol,
      text: this.text,
      imatge: this.imatge,
    });

    //Si volem editar la pregunta, les dades de la pregunta seleccionada es posen al formulari
    effect(() => {
      if(this.preguntaSeleccionada()){
        this.preguntaForm.patchValue({
          titol: this.preguntaSeleccionada()!.titol,
          text: this.preguntaSeleccionada()!.text,
          imatge: this.preguntaSeleccionada()!.imatge,
        })
      }
    });
  }


  submit(): void {
    if (this.preguntaForm.invalid) {
      this.preguntaForm.markAllAsTouched();
      return;
    }
    const dadesForm =  {
      titol: this.titol.value,
      text: this.text.value,
      imatge: this.imatge.value ?? null,
    }
    if(this.idPreguntaSeleccionada()){
      const dadesPregunta : PreguntaDTO =  {
        ...dadesForm,
        id: this.idPreguntaSeleccionada()!
      };
      this.preguntaService.updatePregunta(dadesPregunta).subscribe({
        next: (preguntaActualitzada) => this.actualitzarPregunta(preguntaActualitzada),
        error: (error) => console.error('Error al actualizar la pregunta:', error)
      })
    }
    else{

      this.preguntaService.createPregunta(dadesForm, this.idCiutatSeleccionada()!).subscribe({
        next: (preguntaCreada) => this.actualitzarPregunta(preguntaCreada),
        error: (error) => console.error('Error al crear la pregunta:', error)
      }); 
    }
  }

  actualitzarPregunta(preguntaActualitzada: PreguntaDTO | undefined){
    if(preguntaActualitzada){
      this.preguntaActualitzada.emit(preguntaActualitzada);
    }
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere rellenar el campo " + nom;
    }
    return "";
  }
}
