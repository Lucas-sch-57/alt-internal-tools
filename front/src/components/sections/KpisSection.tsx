import { useAnalytics } from '../../hooks/analytics/useGetAnalytics';
import { useDepartmentsCount } from '../../hooks/departments/useDepartments';
import { useActiveToolsCount } from '../../hooks/tools/useTools';
import { buildKpis } from '../../utils/buildKpis';
import { KpiCard } from '../KpiCard';
import KpiSkeleton from '../ui/KpiSkeleton';

const KpiSection = () => {
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const { data: activeToolsCount, isLoading: toolsLoading } =
    useActiveToolsCount();
  const { data: departmentsCount, isLoading: deptLoading } =
    useDepartmentsCount();
  console.log(analytics);

  const isLoading = analyticsLoading || toolsLoading || deptLoading;

  if (isLoading) return <KpiSkeleton />;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {buildKpis(analytics!, activeToolsCount!, departmentsCount!).map(kpi => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </section>
  );
};

export default KpiSection;
