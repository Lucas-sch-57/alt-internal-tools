import type { UserTool } from '@/types';

export const mapUsagePatterns = (userTools: UserTool[]) => {
  const counts = {
    daily: 0,
    weekly: 0,
    monthly: 0,
    rarely: 0,
  };

  userTools.forEach(r => {
    counts[r.usage_frequency] += 1;
  });

  return [
    { label: 'Daily', value: counts.daily },
    { label: 'Weekly', value: counts.weekly },
    { label: 'Monthly', value: counts.monthly },
    { label: 'Rarely', value: counts.rarely },
  ];
};
