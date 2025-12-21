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
  @Input() items: LlistableDTO[] = [];
  @Input() label = "";
  @Input() control! : FormControl;
  @Input() placeholder = "";
  @Input() errorMessage = "";
  @Input() name = "";
  @Input() required = "required";
}
