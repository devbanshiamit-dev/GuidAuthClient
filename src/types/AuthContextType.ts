import type { LoginRequest, RegisterRequest, UserResponse } from "./auth";

export type AuthContextType = {
    accessToken: string | null;
    user: UserResponse | null;
    isAuthenticated: boolean;
    isloading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
}