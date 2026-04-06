export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  refCode?: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface MeResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface RefreshResponse {
  status: string;
}

export interface LogoutResponse {
  status: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

const API_BASE = '/api';

export const authService = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({ message: 'Ошибка регистрации' }));
      throw new Error(error.message || 'Ошибка регистрации');
    }

    return response.json();
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({ message: 'Неверные учетные данные' }));
      throw new Error(error.message || 'Неверные учетные данные');
    }

    return response.json();
  },

  async logout(): Promise<LogoutResponse> {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Ошибка выхода');
    }

    return response.json();
  },

  async refresh(): Promise<RefreshResponse> {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Сессия истекла');
    }

    return response.json();
  },

  async getMe(): Promise<MeResponse> {
    const response = await fetch(`${API_BASE}/me`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Не авторизован');
    }

    return response.json();
  },
};
