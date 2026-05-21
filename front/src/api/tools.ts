import apiClient from './client';
import type { Tool } from '../types';

export const toolsApi = {
  getAll: (params?: Record<string, any>) =>
    apiClient.get<Tool[]>('/tools', { params }).then(r => r.data),

  getOne: (id: number) => apiClient.get<Tool>(`/tools/${id}`).then(r => r.data),

  getRecent: () =>
    apiClient
      .get<Tool[]>('/tools', {
        params: { _sort: 'updated_at', _order: 'desc', _limit: 8 },
      })
      .then(r => r.data),

  getByStatus: (status: Tool['status']) =>
    apiClient.get<Tool[]>('/tools', { params: { status } }).then(r => r.data),
};
