import apiClient from './client';
import type { Department } from '../types';

export const departmentsApi = {
  getAll: () => apiClient.get<Department[]>('/departments').then(r => r.data),
};
