import { createContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContextType } from '../types/AuthContextType';
import type { LoginRequest, RegisterRequest, UserResponse } from "../types/auth";
import { getCurrentUser, loginUser, logoutUser, refreshToken, registerUser } from "../services/authService";
import { getAccessTokens, getRefreshToken, isAccessTokenExpired, 
    isRefreshTokenExpired, removeTokens, saveTokens } from "../utils/tokenStorage";

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {

    // State to hold authentication information
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isloading, setIsLoading] = useState<boolean>(true);

    const localCleanup = () => {
        setAccessToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }

    // Complete the login function to handle user login in next try
    const login = async (data: LoginRequest): Promise<void> => {

        // fetch the login response from the API
        const response = await loginUser(data);

        saveTokens(response.tokens);

        setAccessToken(response.tokens.accessToken);

        const currentUser = await getCurrentUser(response.tokens.accessToken);
        setUser(currentUser);

        setIsAuthenticated(true);
    };

    const register = async (data: RegisterRequest): Promise<void> => {
        const response = await registerUser(data);

        saveTokens(response.tokens);

        setAccessToken(response.tokens.accessToken);
        const currentUser = await getCurrentUser(response.tokens.accessToken);
        setUser(currentUser);

        setIsAuthenticated(true);
    }

    const logout = (): void => {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
            console.error("No refresh token found. User might not be logged in.");
            return;
        }

        logoutUser({ refreshToken })
            .catch((error) => {
                console.error("Error during logout:", error);
            })
            .finally(() => {
                removeTokens();
                localCleanup();
            })
    }

    const initializeAuth = async () => {
        let token = getAccessTokens();

        if (!token) {
            return;
        }

        if (isAccessTokenExpired()) {
            const storedRefreshToken = getRefreshToken();
            if (!storedRefreshToken || isRefreshTokenExpired()) {
                console.error("Invalid or expired tokens. Logging out.");
                localCleanup();
                return;
            }

            try {
                const response = await refreshToken({ refreshToken: storedRefreshToken });
                saveTokens(response.tokens);
                token = response.tokens.accessToken;
            } catch (error) {
                console.error("Error refreshing token:", error);
                localCleanup();
                return;
            }
        }

        try {
            const currentUser = await getCurrentUser(token);
            setUser(currentUser);
            setIsAuthenticated(true);
            setAccessToken(token);
        } catch (error) {
            localCleanup();
            console.error("Error fetching current user:", error);
        }
        setIsLoading(false);
    };


    useEffect(() => {
        const runInitialization = async () => {
            try {
                await initializeAuth();
            } catch (error) {
                console.error("Error during authentication initialization:", error);
                localCleanup();
            } finally {
                setIsLoading(false);
            }
        };

        void runInitialization();
    }, []);

    const value: AuthContextType = {
        accessToken,
        user,
        isAuthenticated,
        isloading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
