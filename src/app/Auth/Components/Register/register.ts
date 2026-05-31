import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../Services/auth';
import { RegisterDto } from '../../Model/auth.dto';
import { InputEmail } from '../../../Shared/Components/form-controls/input-email/input-email';
import { InputText } from '../../../Shared/Components/form-controls/input-text/input-text';
import { InputPassword } from '../../../Shared/Components/form-controls/input-password/input-password';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';

@Component({
  selector: 'app-register',
  imports: [InputEmail, InputText, InputPassword, Submit, 
    ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  // Servei injectat
  authService = inject(Auth);

  //Formulari de registre, amb els camps: name, email, password i confirmPassword
  registreForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  // Input per rebre l'id de l'itinerari, en cas que el registre sigui per un usuari que vol guardar un itinerari
  @Input() itinerariId: number | null = null;
  

  constructor(
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
    this.email = new FormControl('', [
      Validators.email,
      Validators.required
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);

    //Vinculem els camps al Form
    this.registreForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }
  
  //Funció per registrar usuàries amb cria a la API
  submit(){
    if (this.registreForm.invalid) {
      this.registreForm.markAllAsTouched();
      return;
    } 
    let credentials: RegisterDto = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      password_confirmation: this.confirmPassword.value,
    };
    //Si és un usuari que vol guardar
    if(this.itinerariId){
      this.authService.registreUsuari(credentials, this.itinerariId);
    } 
    //Si és el regiustre d'una nova administradora
    else {
      credentials = {...credentials, rol: 'admin'};
      this.authService.registre(credentials);
    }
  }

  // Funció per mostrar missatges d'error en els camps del formulari
  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return nom + " se requiere";
    }
    if(camp.hasError('email')){
      return nom + " tiene que ser un email válido";
    }
    if(camp.hasError('minLength')){
      return nom + " no tiene el mínimo de caracteres";
    }
    return "";
  }
}
