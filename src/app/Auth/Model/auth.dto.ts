export class AuthDTO {
  user_id: string;
  access_token: string;
  email: string;
  password: string;
  rol?: string | undefined;

  constructor(
    user_id: string,
    access_token: string,
    email: string,
    password: string,
    rol?: string | undefined
  ) {
    this.user_id = user_id;
    this.access_token = access_token;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}
