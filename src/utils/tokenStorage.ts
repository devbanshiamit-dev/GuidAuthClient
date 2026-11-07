import type { TokenResponse } from "../types/auth";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const ACCESS_TOKEN_EXPIRES_AT_KEY = "accessTokenExpiresAtUtc";
const REFRESH_TOKEN_EXPIRES_AT_KEY = "refreshTokenExpiresAtUtc";

export const saveTokens = (Tokens: TokenResponse) => {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, Tokens.accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, Tokens.refreshToken);
    sessionStorage.setItem(ACCESS_TOKEN_EXPIRES_AT_KEY, Tokens.accessTokenExpiresAtUtc);
    sessionStorage.setItem(REFRESH_TOKEN_EXPIRES_AT_KEY, Tokens.refreshTokenExpiresAtUtc);
};

export const getAccessTokens = () => {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getAccessTokenExpiresAt = () => {
    return sessionStorage.getItem(ACCESS_TOKEN_EXPIRES_AT_KEY);
};

export const getRefreshTokenExpiresAt = () => {
    return sessionStorage.getItem(REFRESH_TOKEN_EXPIRES_AT_KEY);
};

export const isAccessTokenExpired = () => {
    const expiresAt = getAccessTokenExpiresAt();
    if (!expiresAt) return true;
    if (Number.isNaN(Date.parse(expiresAt))) return true;

    const expiresAtDate = new Date(expiresAt);
    return expiresAtDate <= new Date();
}

export const isRefreshTokenExpired = () => {
    const expiresAt = getRefreshTokenExpiresAt();
    if (!expiresAt) return true;
    if (Number.isNaN(Date.parse(expiresAt))) return true;
    
    const expiresAtDate = new Date(expiresAt);
    return expiresAtDate <= new Date();
}

export const removeTokens = () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_EXPIRES_AT_KEY);
};