import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-password.html',
  styleUrl: './input-password.scss',
})
export class InputPassword {
  @Input() label = "";
  @Input() type = "";
  @Input() control! : FormControl;
  @Input() placeholder = "****************";
  @Input() errorMessage = "";
  @Input() name = "";
  @Input() required = "required";
}
