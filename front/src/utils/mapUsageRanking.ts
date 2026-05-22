import type { Tool } from '@/types';

export const mapUsageRanking = (tools: Tool[]) => {
  const sorted = [...tools]
    .filter(t => {
      return t.active_users_count !== undefined;
    })
    .sort((a, b) => b.active_users_count - a.active_users_count);

  return {
    mostUsed: sorted.slice(0, 5),
    leastUsed: sorted.slice(-5),
  };
};
