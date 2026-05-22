import { Euro, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RoiMetricProps {
  metric: {
    id: number;
    name: string;
    monthlyCost: number;
    users: number;
    costPerUser: number;
  };
}

const RoiMetricCard: React.FC<RoiMetricProps> = props => {
  const { metric } = props;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{metric.name}</span>

        <div className="bg-pink-500 p-2 rounded-xl">
          <Euro size={18} className="text-white" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            €{Math.round(metric.costPerUser)}
          </span>

          <span className="text-sm text-gray-400">/user</span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <Users size={13} />
          <span>
            {metric.users} users · €{metric.monthlyCost.toLocaleString()}/mo
          </span>
        </div>
      </div>

      <Link
        to={`/tools?toolId=${metric.id}`}
        className="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        View tool details
      </Link>
    </div>
  );
};

export default RoiMetricCard;
