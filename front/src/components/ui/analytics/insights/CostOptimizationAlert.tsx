import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CostOptimizationAlertProps {
  alert: {
    id: number;
    name: string;
    cost: number;
    users: number;
    status?: string;
  };
}

const CostOptimizationAlert: React.FC<CostOptimizationAlertProps> = props => {
  const { alert } = props;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="bg-amber-500 p-2 rounded-xl shrink-0">
          <AlertTriangle size={16} className="text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-gray-900">
              {alert.name}
            </h4>

            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500 text-white">
              Optimization
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            €{alert.cost.toLocaleString()}/month for {alert.users} users.
          </p>
        </div>
      </div>

      <Link
        to={`/tools/${alert.id}`}
        className="text-sm font-medium text-amber-700 hover:text-amber-800"
      >
        View tool details
      </Link>
    </div>
  );
};

export default CostOptimizationAlert;
