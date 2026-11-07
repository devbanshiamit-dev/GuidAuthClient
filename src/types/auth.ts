export interface RegisterRequest{
    name:string;
    email:string;
    password:string;
}

export interface LoginRequest{
    email:string;
    password:string;
}

export interface RefreshTokenRequest{
    refreshToken:string;
}

export interface TokenResponse{
    accessToken:string;
    accessTokenExpiresAtUtc:string;
    refreshToken:string;
    refreshTokenExpiresAtUtc:string;
}

export interface AuthResponse{
    message:string;
    tokens:TokenResponse;
}

export interface UserResponse{
    id:string;
    name:string;
    email:string;
}