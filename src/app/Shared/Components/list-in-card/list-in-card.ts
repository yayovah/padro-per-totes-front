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
  @Input() items: LlistableDTO[] = [];
  @Input() tipus: string = '';
  @Input() editable: boolean = false;
  @Output() accio = new EventEmitter<{ type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }>();

  onAccio(type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any): void {
    this.accio.emit({ type, id });
  }

}
