import type { Tool } from '@/types';

export const mapGrowthTrends = (tools: Tool[]) => {
  const grouped = tools.reduce(
    (acc, tool) => {
      if (tool.created_at) {
        const date = new Date(tool.created_at);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        if (!acc[key]) {
          acc[key] = {
            month: date.toLocaleString('en-US', {
              month: 'short',
            }),
            tools: 0,
            timestamp: new Date(date.getFullYear(), date.getMonth()).getTime(),
          };
        }

        acc[key].tools += 1;
      }

      return acc;
    },
    {} as Record<
      string,
      {
        month: string;
        tools: number;
        timestamp: number;
      }
    >
  );

  return Object.values(grouped)
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ month, tools }) => ({
      month,
      tools,
    }));
};
