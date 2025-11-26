export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface CreateUserDto {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
