import type { Tool } from '@/types';

export const mapDepartmentCost = (tools: Tool[]) => {
  const grouped = tools.reduce(
    (acc, tool) => {
      const department = tool.owner_department;
      const cost = tool.monthly_cost ?? 0;
      if (department) {
        if (!acc[department]) {
          acc[department] = 0;
        }

        acc[department] += cost;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(grouped).map(([department, total]) => ({
    department,
    total,
  }));
};
