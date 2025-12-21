import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthDTO } from '../../Model/auth.dto';
import { InputEmail } from '../../../Shared/Components/form-controls/input-email/input-email';
import { InputPassword } from '../../../Shared/Components/form-controls/input-password/input-password';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import * as AuthAction from '../../Actions/auth.action';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputEmail,
    InputPassword,
    Submit
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
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
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const credentials: AuthDTO = {
      email: this.email.value,
      password: this.password.value,
      access_token: '',
    };
    this.store.dispatch(AuthAction.login({ credentials }));
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return nom + " is required";
    }
    if(camp.hasError('email')){
      return nom + " must be a valid email";
    }
    return "";
  }

}
