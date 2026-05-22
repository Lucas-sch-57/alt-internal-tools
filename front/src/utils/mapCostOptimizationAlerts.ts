import type { Tool } from '@/types';

export const mapCostOptimizationAlerts = (tools: Tool[]) => {
  return tools
    .filter(tool => {
      const cost = tool.monthly_cost ?? 0;
      const users = tool.active_users_count ?? 0;

      return users > 0 && cost > 500 && users < 10;
    })
    .map(tool => ({
      id: tool.id,
      name: tool.name,
      cost: tool.monthly_cost ?? 0,
      users: tool.active_users_count ?? 0,
      status: tool.status,
    }));
};
