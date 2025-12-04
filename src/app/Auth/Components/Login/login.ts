import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,          // ⬅ NECESSARI PER *ngIf, *ngFor
    ReactiveFormsModule,   // ⬅ NECESSARI PER formGroup, formControlName
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){
    //inicialitzem els camps del formulari: email i password
    this.email = new FormControl('', [
      Validators.required, 
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required
    ]);

    //Vinculem els camps al Form
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  login(): void {
    //Lògica del Login
  }
}
