import type { Analytics } from '@/types';

export function buildKpis(
  data: Analytics,
  activeToolsCount: number,
  departmentsCount: number
) {
  return [
    {
      label: 'Monthly Budget',
      value: `€${data.budget_overview.current_month_total.toLocaleString()}`,
      subValue: `€${data.budget_overview.monthly_limit.toLocaleString()}`,
      change: data.kpi_trends.budget_change,
      icon: 'budget' as const,
    },
    {
      label: 'Active Tools',
      value: activeToolsCount.toString(),
      change: data.kpi_trends.tools_change,
      icon: 'tools' as const,
    },
    {
      label: 'Departments',
      value: departmentsCount.toString(),
      change: data.kpi_trends.departments_change,
      icon: 'departments' as const,
    },
    {
      label: 'Cost/User',
      value: `€${data.cost_analytics.cost_per_user}`,
      change: data.kpi_trends.cost_per_user_change,
      icon: 'cost' as const,
    },
  ];
}
