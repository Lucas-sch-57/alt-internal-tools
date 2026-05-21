import apiClient from './client';
import type { Analytics } from '../types';

export const analyticsApi = {
  get: () => apiClient.get<Analytics>('/analytics').then(r => r.data),
};
