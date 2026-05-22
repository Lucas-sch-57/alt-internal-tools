import type { User } from '@/types';
import apiClient from './client';

export const usersApi = {
  getAll: () => apiClient.get<User[]>('/users').then(r => r.data),
};
