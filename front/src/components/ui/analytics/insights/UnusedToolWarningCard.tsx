import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UnusedToolWarningProps {
  tool: {
    id: number;
    name: string;
    cost: number;
    users: number;
    status?: string;
  };
}

const UnusedToolWarningCard: React.FC<UnusedToolWarningProps> = props => {
  const { tool } = props;

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="bg-red-500 p-2 rounded-xl shrink-0">
          <AlertCircle size={16} className="text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-gray-900">{tool.name}</h4>

            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500 text-white">
              Unused
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {tool.users === 0 && 'No active users'} costing €
            {tool.cost.toLocaleString()}/month.
          </p>
        </div>
      </div>

      <Link
        to={`/tools?toolId=${tool.id}`}
        className="text-sm font-medium text-red-700 hover:text-red-800"
      >
        View tool details
      </Link>
    </div>
  );
};

export default UnusedToolWarningCard;
