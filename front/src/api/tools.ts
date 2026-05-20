import apiClient from './client';

export const toolsApi = {
  getAll: (params?: Record<string, any>) =>
    apiClient.get('/tools', { params }).then(r => r.data),

  getOne: (id: number) => apiClient.get(`/tools/${id}`).then(r => r.data),

  create: (payload: Record<string, any>) =>
    apiClient.post('/tools', payload).then(r => r.data),

  update: (id: number, payload: Record<string, any>) =>
    apiClient.put(`/tools/${id}`, payload).then(r => r.data),
};
