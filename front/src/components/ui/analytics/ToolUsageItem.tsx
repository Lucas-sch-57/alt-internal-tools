import type { Tool } from '@/types';

interface ToolUsageItemProps {
  tool: Tool;
  maxUsers: number;
}
const ToolUsageItem: React.FC<ToolUsageItemProps> = ({ tool, maxUsers }) => {
  const users = tool.active_users_count ?? 0;

  const percentage =
    users > 0 && maxUsers > 0 ? Math.max(4, (users / maxUsers) * 100) : 0;

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {tool.icon_url && (
            <img src={tool.icon_url} alt={tool.name} className="w-5 h-5" />
          )}

          <span className="text-sm font-medium text-gray-900">{tool.name}</span>
        </div>

        <span className="text-sm text-gray-500">
          {tool.active_users_count} users
        </span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ToolUsageItem;
