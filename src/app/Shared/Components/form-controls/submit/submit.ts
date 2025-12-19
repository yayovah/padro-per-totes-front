import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-submit',
  imports: [CommonModule],
  templateUrl: './submit.html',
  styleUrl: './submit.scss',
})
export class Submit {
  @Input() text = "";
  @Input() icono = false;
}
