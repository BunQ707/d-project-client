import axios from 'axios';
import { apiClient } from '../utils/axios';

export interface LoginResponse {
  data: { accessToken: string; refreshToken: string };
}

export const login = (params: Record<string, unknown>): Promise<LoginResponse> => {
  return apiClient.post('api/auth/sign-in', params);
};

export const loginA8 = (tokenA8: string, newWalletAddress?: string) => {
  return apiClient.request({
    method: 'POST',
    url: 'api/auth/sign-in-a8',
    data: {
      token: tokenA8,
      ...(newWalletAddress && { walletAddressInput: newWalletAddress }),
    },
  });
};
