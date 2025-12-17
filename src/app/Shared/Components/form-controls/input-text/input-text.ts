import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule],
  templateUrl: './input-text.html',
  styleUrl: './input-text.scss',
})
export class InputText {
  @Input() label = "";
  @Input() type = "";
  @Input() control! : FormControl;
  @Input() placeholder = "";
  @Input() errorMessage = "";
  @Input() name = "";
  @Input() required = "required";
}
