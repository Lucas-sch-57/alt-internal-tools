import type { Tool } from '@/types';

export const mapRoiMetrics = (tools: Tool[]) => {
  return tools
    .filter(tool => tool.active_users_count > 0)
    .map(tool => {
      const cost = tool.monthly_cost ?? 0;
      const users = tool.active_users_count;

      return {
        id: tool.id,
        name: tool.name,
        monthlyCost: cost,
        users,
        costPerUser: users > 0 ? cost / users : cost,
      };
    })
    .sort((a, b) => b.costPerUser - a.costPerUser)
    .slice(0, 4);
};
