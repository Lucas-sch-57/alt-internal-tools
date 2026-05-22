import type { UserTool, User } from '@/types';
import apiClient from './client';

export const usersApi = {
  getAll: () => apiClient.get<User[]>('/users').then(r => r.data),
  getTools: () => apiClient.get<UserTool[]>('/user_tools').then(r => r.data),
};
