import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-submit',
  imports: [CommonModule],
  templateUrl: './submit.html',
  styleUrl: './submit.scss',
})
export class Submit {
  @Input() text = "";
  @Input() icono = false;
  @Output() clickEvent = new EventEmitter<void>();

  onClick(){
    this.clickEvent.emit();
  }
}
