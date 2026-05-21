import type { Analytics } from '@/types';

export const mapBudgetComparaison = (analytics: Analytics) => {
  const safe = (v?: number) => v ?? 0;

  return [
    {
      label: 'Previous',
      total: safe(analytics.budget_overview.previous_month_total),
    },
    {
      label: 'Current',
      total: safe(analytics.budget_overview.current_month_total),
    },
  ];
};
