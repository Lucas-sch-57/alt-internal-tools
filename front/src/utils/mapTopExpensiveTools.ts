import type { Tool } from '@/types';

export const mapTopExpensiveTools = (tools: Tool[]) => {
  return [...tools]
    .sort((a, b) => (b.monthly_cost ?? 0) - (a.monthly_cost ?? 0))
    .slice(0, 5)
    .map(tool => ({
      name: tool.name,
      cost: tool.monthly_cost ?? 0,
    }));
};
