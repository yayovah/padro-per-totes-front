import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-email',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-email.html',
  styleUrl: './input-email.scss',
})
export class InputEmail {
  @Input() label = "";
  @Input() type = "";
  @Input() control! : FormControl;
  @Input() placeholder = "";
  @Input() errorMessage = "";
  @Input() name = "";
  @Input() required = "required";
}
