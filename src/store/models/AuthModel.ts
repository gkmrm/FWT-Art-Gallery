export interface AuthRequest {
  username: string;
  password: string;
  fingerprint?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  fingerprint?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
