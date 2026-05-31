import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CiutatDTO } from '../../../Ciutat/Models/ciutat.dto';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Submit } from '../form-controls/submit/submit';
import { LlistableDTO } from '../../Models/llistable.dto';


@Component({
  selector: 'app-list-in-card',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './list-in-card.html',
  styleUrl: './list-in-card.scss',
})
export class ListInCard {
  /* Paramtres d'entrada al component LIST-IN-CARD */
  @Input() items: LlistableDTO[] = [];
  @Input() tipus: string = '';
  @Input() editable: boolean = false;
  @Input() esborrable: boolean = false;
  @Input() clickable: boolean = true;
  @Input() idSelected?: any;

  /* Paramtres de sortida del component LIST-IN-CARD */
  @Output() accio = new EventEmitter<{ type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }>();

  /*Funció que emetrà a la sortida del component l'acció seleccionada i l'id de l'element sobre el que es fa l'acció*/
  onAccio(type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any): void {
    if(id){
      this.idSelected = id;
    }
    this.accio.emit({ type, id });
  }

}
