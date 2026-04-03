export interface User {
  id: string;
  email: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}