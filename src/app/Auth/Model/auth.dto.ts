export interface AuthDTO {
  user: UserDTO,
  token: string;
}

export interface AuthToken {
  id: number;
  token: string;
}

export interface UserDTO {
  id?: number;
  email?: string;
  password?: string;
  rol?: string;
}
 
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface resetPswDTO{
  token: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}