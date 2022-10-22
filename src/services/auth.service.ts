import { LoginDto, RegisterDto } from 'services/auth.dto';
import { apiClient } from '../utils/axios';

export interface LoginResponse {
  data: { accessToken: string };
}

export const login = (params: LoginDto): Promise<LoginResponse> => {
  return apiClient.post('login', params);
};

export const register = (params: RegisterDto) => {
  return apiClient.post('signin', params);
};
