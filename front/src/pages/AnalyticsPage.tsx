import BudgetProgressCard from '@/components/ui/analytics/charts/BudgetProgressCard';
import DepartmentCostBreakdownChart from '@/components/ui/analytics/charts/DepartmentCostBreakdownChart';
import MonthlySpendEvolutionChart from '@/components/ui/analytics/charts/MonthlySpendEvolutionChart';
import TopExpensiveToolsChart from '@/components/ui/analytics/charts/TopExpensiveToolsChart';
import PageHeader from '@/components/ui/PageHeader';
import { useAnalytics } from '@/hooks/analytics/useGetAnalytics';
import { useGetAll } from '@/hooks/tools/useTools';
import { mapBudgetComparaison } from '@/utils/mapBudgetComparaison';
import { mapDepartmentCost } from '@/utils/mapDepartmentCosts';
import { mapTopExpensiveTools } from '@/utils/mapTopExpensiveTools';
const AnalyticsPage = () => {
  const analyticsQuery = useAnalytics();
  const toolsQuery = useGetAll();
  const tools = toolsQuery.data!;
  const analytics = analyticsQuery.data!;

  const isLoading = analyticsQuery.isLoading || toolsQuery.isLoading;
  const isError = analyticsQuery.isError || toolsQuery.isError;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const monthlyCostBudgetData = mapBudgetComparaison(analytics);
  const departmentCostData = mapDepartmentCost(tools);
  const topExpensiveData = mapTopExpensiveTools(tools);

  return (
    <main className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
      <PageHeader
        title="Analytics"
        subtitle="Follow your stats over the months"
      />
      <div className="flex flex-col md:flex-row gap-4">
        <MonthlySpendEvolutionChart
          data={monthlyCostBudgetData}
          trend={analytics.budget_overview.trend_percentage}
        />
        <DepartmentCostBreakdownChart costData={departmentCostData} />
      </div>
      <TopExpensiveToolsChart data={topExpensiveData} />
      <BudgetProgressCard
        current={analytics.budget_overview.current_month_total}
        limit={analytics.budget_overview.monthly_limit}
        trend={analytics.budget_overview.trend_percentage}
        utilization={analytics.budget_overview.budget_utilization}
      />
    </main>
  );
};
export default AnalyticsPage;
