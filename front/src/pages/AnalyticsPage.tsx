import MonthlySpendEvolutionChart from '@/components/ui/analytics/charts/MonthlySpendEvolutionChart';
import PageHeader from '@/components/ui/PageHeader';
import { useAnalytics } from '@/hooks/analytics/useGetAnalytics';
import { mapBudgetComparaison } from '@/utils/mapBudgetComparaison';
const AnalyticsPage = () => {
  const { data, isLoading, isError } = useAnalytics();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const monthlyCostBudgetData = mapBudgetComparaison(data);

  return (
    <main className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
      <PageHeader
        title="Analytics"
        subtitle="Follow your stats over the months"
      />
      <MonthlySpendEvolutionChart
        data={monthlyCostBudgetData}
        trend={data.budget_overview.trend_percentage}
      />
    </main>
  );
};
export default AnalyticsPage;
