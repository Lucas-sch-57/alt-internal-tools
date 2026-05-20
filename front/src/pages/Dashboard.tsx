import { KpiCard } from '../components/KpiCard';
import { mockKpis } from '../datas/mock';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 h-screen p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Internal Tools Dashboard</h1>
        <p className="text-base text-gray-400">
          Monitor and manage your organization's software tools and expenses
        </p>
      </div>
      <div className="flex justify-between items-center gap-6">
        {Object.entries(mockKpis).map(([key, kpi]) => (
          <KpiCard
            key={key}
            label={key}
            change={kpi.change}
            value={kpi.value.toString()}
            icon={
              key === 'monthlyBudget'
                ? 'budget'
                : key === 'activeTools'
                  ? 'tools'
                  : key === 'departments'
                    ? 'departments'
                    : 'cost'
            }
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
