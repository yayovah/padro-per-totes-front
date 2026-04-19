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
 