import type { RegisterRequest, AuthResponse, UserResponse, RefreshTokenRequest } from "../types/auth";
import { apiRequest } from "./apiClient";
import endpoints from "../config/endpoint";

const registerEndpoint = endpoints.register;
const loginEndpoint = endpoints.login;
const refreshTokenEndpoint = endpoints.refreshToken;
const logoutEndpoint = endpoints.logout;
const meEndpoint = endpoints.me;

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
    return await apiRequest<AuthResponse>(registerEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
};

export const loginUser = async (data: { email: string; password: string }): Promise<AuthResponse> => {
    return await apiRequest<AuthResponse>(loginEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export const refreshToken = async (data: RefreshTokenRequest): Promise<AuthResponse> => {
    return await apiRequest<AuthResponse>(refreshTokenEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export const logoutUser = async (data: RefreshTokenRequest): Promise<void> => {
    await apiRequest<void>(logoutEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export const getCurrentUser = async (accessToken: string): Promise<UserResponse> => {
    return await apiRequest<UserResponse>(meEndpoint, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}` 
        },
        body: null
    });
}