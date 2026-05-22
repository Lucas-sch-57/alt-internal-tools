import { Wallet } from 'lucide-react';

interface BudgetProgressCardProps {
  current: number;
  limit: number;
  utilization: string | number;
  trend: string | number;
}
const BudgetProgressCard: React.FC<BudgetProgressCardProps> = props => {
  const { current, limit, utilization, trend } = props;
  const progress = Number(utilization);
  const remaining = limit - current;

  const progressColor =
    progress >= 90
      ? 'bg-red-500'
      : progress >= 70
        ? 'bg-amber-500'
        : 'bg-green-500';
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Budget Progress</h3>
        <p className="text-sm text-gray-500">Monthly Budget utilization</p>
      </div>
      <div className="bg-blue-500 p-2 rounded-xl w-fit">
        <Wallet size={18} className="text-white" />
      </div>
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            €{current.toLocaleString()}
          </span>
          <span className="text-lg text-gray-400">
            / €{limit.toLocaleString()}
          </span>
        </div>

        <span className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500 text-white">
          {trend}% vs last month
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Budget used</span>
          <span className="font-semibold text-gray-900">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Remaining budget:
          <span className="font-semibold text-gray-900 ml-1">
            €{remaining.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BudgetProgressCard;
