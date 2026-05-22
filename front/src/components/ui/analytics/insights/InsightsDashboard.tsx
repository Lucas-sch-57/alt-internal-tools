import CostOptimizationAlert from './CostOptimizationAlert';

interface InsightsDashboardProps {
  costAlerts: {
    id: number;
    name: string;
    cost: number;
    users: number;
    status?: string;
  }[];
}

const InsightsDashboard: React.FC<InsightsDashboardProps> = props => {
  const { costAlerts } = props;

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {costAlerts.map(alert => (
          <CostOptimizationAlert key={alert.id} alert={alert} />
        ))}
      </div>
    </section>
  );
};

export default InsightsDashboard;
