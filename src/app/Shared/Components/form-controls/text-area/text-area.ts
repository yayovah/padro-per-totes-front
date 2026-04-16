import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-area',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-area.html',
  styleUrl: './text-area.scss',
})
export class TextArea {
  @Input() label = "";
  @Input() control! : FormControl;
  @Input() placeholder = "";
  @Input() errorMessage = "";
  @Input() name = "";
  @Input() required = "required";
}
