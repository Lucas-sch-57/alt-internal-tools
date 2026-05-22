import type { Tool } from '@/types';

export const mapUnusedTools = (tools: Tool[]) => {
  return tools
    .filter(tool => {
      const users = tool.active_users_count ?? 0;

      return users === 0 || tool.status === 'unused';
    })
    .map(tool => ({
      id: tool.id,
      name: tool.name,
      cost: tool.monthly_cost ?? 0,
      users: tool.active_users_count ?? 0,
      status: tool.status,
    }));
};
