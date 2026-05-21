import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import type { Tool } from '../../types';
import Badge from './Badge';
import { normalizeStatus } from '../../utils/normalizeStatus';

type SortKey =
  | 'name'
  | 'monthly_cost'
  | 'active_users_count'
  | 'owner_department';
type SortDir = 'asc' | 'desc';

type ToolTableProps = {
  tools: Tool[];
  showActions?: boolean;
  onView?: (tool: Tool) => void;
};

const ToolTable: React.FC<ToolTableProps> = ({
  tools,
  showActions = false,
  onView,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...tools].sort((a, b) => {
    const valA = a[sortKey] ?? 0;
    const valB = b[sortKey] ?? 0;
    if (!isNaN(Number(valA)) && !isNaN(Number(valB))) {
      return sortDir === 'asc'
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    }
    return sortDir === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col)
      return <ChevronsUpDown size={14} className="text-gray-400" />;
    return sortDir === 'asc' ? (
      <ChevronUp size={14} className="text-blue-600" />
    ) : (
      <ChevronDown size={14} className="text-blue-600" />
    );
  };

  const columns: { label: string; key: SortKey; sortable: boolean }[] = [
    { label: 'Tool', key: 'name', sortable: true },
    { label: 'Department', key: 'owner_department', sortable: true },
    { label: 'Users', key: 'active_users_count', sortable: true },
    { label: 'Monthly Cost', key: 'monthly_cost', sortable: true },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                className={`px-6 py-4 text-left text-sm font-medium text-gray-500 select-none ${
                  col.sortable ? 'cursor-pointer hover:text-gray-900' : ''
                }`}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && <SortIcon col={col.key} />}
                </div>
              </th>
            ))}
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Status
            </th>
            {showActions && (
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {sorted.map(tool => (
            <tr
              key={tool.id}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              {/* Tool */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {tool.icon_url && (
                    <img
                      src={tool.icon_url}
                      alt={tool.name}
                      className="w-6 h-auto"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-900">
                    {tool.name}
                  </span>
                </div>
              </td>

              {/* Department */}
              <td className="px-6 py-4 text-sm text-gray-600">
                {tool.owner_department}
              </td>

              {/* Users */}
              <td className="px-6 py-4 text-sm text-gray-600">
                {tool.active_users_count}
              </td>

              {/* Monthly Cost */}
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {tool.monthly_cost != null
                  ? `€${Number(tool.monthly_cost).toLocaleString()}`
                  : '—'}
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                {tool.status && <Badge status={normalizeStatus(tool.status)} />}
              </td>

              {/* Actions */}
              {showActions && (
                <td className="px-6 py-4 relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === tool.id ? null : tool.id)
                    }
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 min-w-11 min-h-11 flex items-center justify-center"
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  {openMenu === tool.id && (
                    <div className="absolute right-6 top-12 z-10 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-40">
                      <button
                        className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        onClick={() => {
                          onView?.(tool);
                          setOpenMenu(null);
                        }}
                      >
                        <Eye size={14} /> View
                      </button>
                      <button className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <Pencil size={14} /> Edit
                      </button>
                      <button className="w-full px-4 py-2.5 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-2">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {sorted.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-400">
          No tools found
        </div>
      )}
    </div>
  );
};

export default ToolTable;
