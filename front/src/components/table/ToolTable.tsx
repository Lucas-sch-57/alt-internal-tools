import type { Tool } from '../../types';
import Badge from '../ui/Badge';

type ToolTableProps = {
  tools: Tool[];
};

const ToolTable: React.FC<ToolTableProps> = ({ tools }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
              Tool
            </th>

            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
              Department
            </th>

            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
              Users
            </th>

            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
              Monthly Cost
            </th>

            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {tools.map(tool => (
            <tr
              key={tool.id}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-5 text-sm font-medium text-gray-900">
                {tool.name}
              </td>

              <td className="px-6 py-5 text-sm text-gray-600">
                {tool.owner_department}
              </td>

              <td className="px-6 py-5 text-sm text-gray-600">
                {tool.active_users_count}
              </td>

              <td className="px-6 py-5 text-sm text-gray-600">
                €{tool.monthly_cost}
              </td>

              <td className="px-6 py-5">
                <Badge status={tool.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToolTable;
