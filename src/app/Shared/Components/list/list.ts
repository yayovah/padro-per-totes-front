import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CiutatDTO } from '../../../Ciutat/Models/ciutat.dto';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Submit } from '../form-controls/submit/submit';



@Component({
  selector: 'app-list',
  imports: [FontAwesomeModule, CommonModule, Submit],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  @Input() items: any[] = [];
  @Input() title: string = '';
  @Input() editable: boolean = false;
  @Input() back: boolean = true;
  @Output() accio = new EventEmitter<{ type: 'edit' | 'delete' | 'view' | 'back' | 'add', item: any }>();

  onAccio(type: 'edit' | 'delete' | 'view' | 'back' | 'add', item: any): void {
    this.accio.emit({ type, item });
  }

}