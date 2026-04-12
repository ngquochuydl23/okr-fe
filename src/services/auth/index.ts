export interface IAuthService {
  loginViaGoogle: () => Promise<void>;
}

export const AuthService: IAuthService = {
  async loginViaGoogle(): Promise<void> {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google/login-redirect`;
  }
}