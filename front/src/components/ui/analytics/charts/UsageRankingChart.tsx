import type { Tool } from '@/types';
import ToolUsageItem from '../ToolUsageItem';

interface UsageRankingProps {
  data: {
    mostUsed: Tool[];
    leastUsed: Tool[];
  };
}
const UsageRankingChart: React.FC<UsageRankingProps> = props => {
  const { data } = props;
  console.log(data);

  const maxUsers = Math.max(
    ...data.mostUsed.map(t => t.active_users_count),
    ...data.leastUsed.map(t => t.active_users_count)
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Most/Least used tool
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔥</span>

            <h4 className="font-semibold text-gray-900">Most Used</h4>
          </div>

          {data.mostUsed.map(tool => (
            <ToolUsageItem key={tool.id} tool={tool} maxUsers={maxUsers} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>

            <h4 className="font-semibold text-gray-900">Least Used</h4>
          </div>

          {data.leastUsed.map(tool => (
            <ToolUsageItem key={tool.id} tool={tool} maxUsers={maxUsers} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsageRankingChart;
