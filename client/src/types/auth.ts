export interface AuthUser {
  token: string;
  email: string;
  fullName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}
