export interface AuthDTO {
  user: UserDTO,
  access_token: string;
}

export interface AuthToken {
  user_id: number;
  access_token: string;
}

export interface UserDTO {
  user_id?: number;
  email?: string;
  password?: string;
  rol?: string;
}
 