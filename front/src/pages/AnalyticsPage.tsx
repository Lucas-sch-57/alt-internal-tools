import BudgetProgressCard from '@/components/ui/analytics/charts/BudgetProgressCard';
import DepartmentActivityChart from '@/components/ui/analytics/charts/DepartmentActivityChart';
import DepartmentCostBreakdownChart from '@/components/ui/analytics/charts/DepartmentCostBreakdownChart';
import GrowthTrendsChart from '@/components/ui/analytics/charts/GrowthTrendsChart';
import MonthlySpendEvolutionChart from '@/components/ui/analytics/charts/MonthlySpendEvolutionChart';
import TopExpensiveToolsChart from '@/components/ui/analytics/charts/TopExpensiveToolsChart';
import UsageRankingChart from '@/components/ui/analytics/charts/UsageRankingChart';
import UserAdoptionChart from '@/components/ui/analytics/charts/UserAdoptionChart';
import InsightsDashboard from '@/components/ui/analytics/insights/InsightsDashboard';
import PageHeader from '@/components/ui/PageHeader';
import { useAnalytics } from '@/hooks/analytics/useGetAnalytics';
import { useGetAllDepartments } from '@/hooks/departments/useDepartments';
import { useGetAll } from '@/hooks/tools/useTools';
import { useGetAllUsers, useGetUserTools } from '@/hooks/users/useUsers';
import { mapBudgetComparaison } from '@/utils/mapBudgetComparaison';
import { mapCostOptimizationAlerts } from '@/utils/mapCostOptimizationAlerts';
import { mapDepartmentActivity } from '@/utils/mapDepartmentActivity';
import { mapDepartmentCost } from '@/utils/mapDepartmentCosts';
import { mapGrowthTrends } from '@/utils/mapGrowthTrends';
import { mapRoiMetrics } from '@/utils/mapRoiMetrics';
import { mapTopExpensiveTools } from '@/utils/mapTopExpensiveTools';
import { mapUnusedTools } from '@/utils/mapUnsusedTools';
import { mapUsageHeatmap } from '@/utils/mapUsageHeatMap';
import { mapUsagePatterns } from '@/utils/mapUsagePatterns';
import { mapUsageRanking } from '@/utils/mapUsageRanking';
import { mapUserAdoption } from '@/utils/mapUserAdoption';
const AnalyticsPage = () => {
  const analyticsQuery = useAnalytics();
  const toolsQuery = useGetAll();
  const usersQuery = useGetAllUsers();
  const departmentsQuery = useGetAllDepartments();
  const userToolsQuery = useGetUserTools();

  const tools = toolsQuery.data!;
  const analytics = analyticsQuery.data!;
  const users = usersQuery.data!;
  const departments = departmentsQuery.data!;
  const userTools = userToolsQuery.data!;

  const isLoading =
    analyticsQuery.isLoading ||
    toolsQuery.isLoading ||
    usersQuery.isLoading ||
    departmentsQuery.isLoading ||
    userToolsQuery.isLoading;
  const isError =
    analyticsQuery.isError ||
    toolsQuery.isError ||
    usersQuery.isError ||
    departmentsQuery.isError ||
    userToolsQuery.isError;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const monthlyCostBudgetData = mapBudgetComparaison(analytics);
  const departmentCostData = mapDepartmentCost(tools);
  const topExpensiveData = mapTopExpensiveTools(tools);
  const userAdoptionData = mapUserAdoption(tools, users.length);
  const usageRankingData = mapUsageRanking(tools);
  const departmentsActivityData = mapDepartmentActivity(users, departments);
  const growthTrendsData = mapGrowthTrends(tools);
  const costOptimizationsData = mapCostOptimizationAlerts(tools);
  const unusedToolsData = mapUnusedTools(tools);
  const roiMetrics = mapRoiMetrics(tools);
  const usagePatternData = mapUsagePatterns(userTools);
  const usageHeatmapData = mapUsageHeatmap(userTools);

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
      <UserAdoptionChart data={userAdoptionData} totalUsers={users.length} />
      <UsageRankingChart data={usageRankingData} />
      <DepartmentActivityChart data={departmentsActivityData} />
      <GrowthTrendsChart data={growthTrendsData} />
      <InsightsDashboard
        costAlerts={costOptimizationsData}
        unusedTools={unusedToolsData}
        roiMetrics={roiMetrics}
        usagePatterns={usagePatternData}
        usageHeatmap={usageHeatmapData}
      />
    </main>
  );
};
export default AnalyticsPage;
