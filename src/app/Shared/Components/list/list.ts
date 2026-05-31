import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CiutatDTO } from '../../../Ciutat/Models/ciutat.dto';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Submit } from '../form-controls/submit/submit';
import { LlistableDTO } from '../../Models/llistable.dto';



@Component({
  selector: 'app-list',
  imports: [FontAwesomeModule, CommonModule, Submit],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  /* Paramtres d'entrada al component LIST */
  @Input() items: LlistableDTO[] = [];
  @Input() idSelected?: any;
  @Input() title: string = '';
  @Input() editable: boolean = false;
  @Input() back: boolean = true;
  @Input() buttonText: string = 'Nueva';

  /* Paramtres de sortida del component LIST */ 
  @Output() accio = new EventEmitter<{ type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }>();

  /*Funció que emetrà a la sortida del component l'acció seleccionada i l'id de l'element sobre el que es fa l'acció*/
  onAccio(type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any): void {
    this.idSelected = id;
    this.accio.emit({ type, id });
  }

}