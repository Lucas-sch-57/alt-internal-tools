import type { Tool } from '@/types';

export const mapUserAdoption = (tools: Tool[], totalUsers: number) => {
  return tools.map(tool => ({
    name: tool.name,
    adoption: Math.round((tool.active_users_count / totalUsers) * 100),
    users: tool.active_users_count,
  }));
};
