export enum Role {
  SuperAdmin = "super_admin",
}

export interface User {
  email: string;
  name: string;
  token: string | null;
  role: Role;
  exp: number;
}

export interface AuthState {
  ui: {
    isLoading: boolean;
    error: string | null;
    resetPasswordSuccess: boolean;
    submitPasswordSuccess: boolean;
  };
}

export const initialAuthState = {
  ui: {
    isLoading: false,
    error: null,
    resetPasswordSuccess: false,
    submitPasswordSuccess: false
  }
};
