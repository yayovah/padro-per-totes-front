import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-submit', 
  imports: [CommonModule],
  templateUrl: './submit.html',
  styleUrl: './submit.scss',
})
export class Submit {
  /* Paramtres d'entrada al component SUBMIT */
  @Input() text = ""; //text que es mostrarà al botó de submit
  @Input() icono = false; //entrada per mostrar o no una icona al botó

  /* Paramtres de sortida del component SUBMIT */
  @Output() clickEvent = new EventEmitter<void>(); //sortida que emtrà el component

  onClick(){
    this.clickEvent.emit(); //s'emet l'esdeveniment quan es crida la funció onClick
  }
}
