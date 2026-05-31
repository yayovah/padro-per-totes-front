import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LlistableDTO } from '../../../Models/llistable.dto';

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  /* Paramtres d'entrada al component SELECT */
  @Input() items: LlistableDTO[] = []; //array d'items que es mostraran al select, de tipus LlistableDTO
  @Input() label = "";                //label del select, que es mostrarà a la plantilla  
  @Input() control! : FormControl;    //FormControl que es passarà des del component pare per controlar el valor seleccionat al select
  @Input() errorMessage = "";         //missatge d'error que es mostrarà a la plantilla quan el control sigui invàlid i hagi estat tocat
  @Input() name = "";                 //nom del select, que es passarà a la plantilla a l'estiqueta name del select
  @Input() required = "required";     //entrada per definir si el select és required o no

  requiredText : string = ""; //variable per definir si el select és required o no, per mostrar-ho a la plantilla

  constructor(){
    //definim el text del requiredText en funció de si el select és required o no
    if(this.required === "required"){
      this.requiredText = "required";
    }
  }
}
