import apiClient from './client';

export const analyticsApi = {
  departmentCosts: (params?: Record<string, any>) =>
    apiClient.get('/analytics/department-costs', { params }).then(r => r.data),

  expensiveTools: (params?: Record<string, any>) =>
    apiClient.get('/analytics/expensive-tools', { params }).then(r => r.data),

  toolsByCategory: () =>
    apiClient.get('/analytics/tools-by-category').then(r => r.data),

  lowUsageTools: (params?: Record<string, any>) =>
    apiClient.get('/analytics/low-usage-tools', { params }).then(r => r.data),

  vendorSummary: () =>
    apiClient.get('/analytics/vendor-summary').then(r => r.data),
};
