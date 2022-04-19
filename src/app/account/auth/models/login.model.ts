export interface LoginModel {
  username: string;
  password: string;
  token: string;
}

export interface AuthResponse {
  ok: boolean;
  uid?: string;
  name?: string;
  token?: string;
  msg?: string;
}

export interface User {
  uid: string;
  name: string;
}