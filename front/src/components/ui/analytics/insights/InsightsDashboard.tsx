import CostOptimizationAlert from './CostOptimizationAlert';
import RoiMetricCard from './RoiMetricCard';
import UnusedToolWarningCard from './UnusedToolWarningCard';
import UsageHeatmap from './UsageHeatmap';
import UsagePatternCard from './UsagePatternCard';

interface InsightsDashboardProps {
  costAlerts: {
    id: number;
    name: string;
    cost: number;
    users: number;
    status?: string;
  }[];

  unusedTools: {
    id: number;
    name: string;
    cost: number;
    users: number;
    status?: string;
  }[];
  roiMetrics: {
    id: number;
    name: string;
    monthlyCost: number;
    users: number;
    costPerUser: number;
  }[];
  usagePatterns: {
    label: string;
    value: number;
  }[];
  usageHeatmap: {
    day: string;
    value: number;
  }[];
}

const InsightsDashboard: React.FC<InsightsDashboardProps> = props => {
  const { costAlerts, unusedTools, roiMetrics, usagePatterns, usageHeatmap } =
    props;

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Business Insights
        </h3>
        <p className="text-sm text-gray-500">
          Optimization alerts based on usage and cost.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {costAlerts.map(alert => (
            <CostOptimizationAlert key={alert.id} alert={alert} />
          ))}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Unused Tools Warnings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unusedTools.map(tool => (
              <UnusedToolWarningCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            ROI Calculations
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {roiMetrics.map(metric => (
              <RoiMetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Usage Patterns
          </h4>
          <div className="flex flex-col gap-4">
            <UsagePatternCard data={usagePatterns} />
            <UsageHeatmap data={usageHeatmap} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsDashboard;
