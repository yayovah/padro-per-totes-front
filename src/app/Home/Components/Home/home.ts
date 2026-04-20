import { Component, computed, inject, signal } from '@angular/core';
import { CiutatDTO } from '../../../Ciutat/Models/ciutat.dto';
import { Ciutats } from '../../../Ciutat/Services/ciutats';
import { RespostaDTO } from '../../../Respostes/Models/resposta.dto';
import { PreguntaDTO } from '../../../Preguntes/Models/pregunta.dto';
import { SituacioDTO } from '../../../Situacions/Model/situacio.dto';
import { Pregunta } from '../../../Preguntes/Services/pregunta';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private ciutatsService = inject(Ciutats);
  ciutats = signal<CiutatDTO[]>([]);
  ciutatSeleccionada = signal<CiutatDTO | null>(null);
  idCiutatSeleccionada = computed(() => this.ciutatSeleccionada()?.id ?? null);

  private preguntaService = inject(Pregunta);
  preguntaActual = signal<PreguntaDTO | null>(null);
  idPreguntaActual = computed(() => this.preguntaActual()?.id ?? null);
  situacions = signal<SituacioDTO[]>([]);
  respostes = signal<RespostaDTO[]>([]);

  ngOnInit(): void {
    this.ciutatsService.getCiutats().subscribe((ciutats: CiutatDTO[]) => {
      this.ciutats.set(ciutats);
    });
  }

  actualitzarCiutat(ciutatOutput: CiutatDTO | undefined){
    this.ciutatSeleccionada.set(ciutatOutput ?? null);
    this.carregaSituacionsInicials();
  }

  carregaSituacionsInicials(){
    if(this.idCiutatSeleccionada()){

/*
A DESENVOLUPAR:
pensar com se sap la primera pregunta d'una ciutaT!!!
si és final (o sigui, no pregunta sinó final d'itinerari, que no té respostes) marcar amb una resposta -1
*/


      //Carrega la primera pregunta
      this.preguntaService.getPreguntesByCiutat(this.idCiutatSeleccionada()!).subscribe({
        next: (pregunta) => this.preguntaActual.set(pregunta ?? null),
        error: (error) => console.error('Error al obtener las preguntas:', error)
      });
      //Carrega les situacions de la primera pregunta

    } 
  }

  
}
