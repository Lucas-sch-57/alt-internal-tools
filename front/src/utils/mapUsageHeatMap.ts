import type { UserTool } from '@/types';

export const mapUsageHeatmap = (userTools: UserTool[]) => {
  const grouped: Record<string, number> = {};
  userTools.forEach(r => {
    if (!r.last_used) return;
    const date = new Date(r.last_used);
    const day = date.toLocaleDateString('en-US', {
      weekday: 'short',
    });

    grouped[day] = (grouped[day] ?? 0) + 1;
  });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return days.map(day => ({
    day,
    value: grouped[day] ?? 0,
  }));
};
