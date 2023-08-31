export interface IAuthRequest {
  username: string;
  password: string;
  fingerprint?: string;
}

export interface IRefreshTokenRequest {
  refreshToken: string;
  fingerprint?: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}
