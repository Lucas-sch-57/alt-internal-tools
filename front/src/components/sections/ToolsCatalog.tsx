import { useMemo, useState } from 'react';
import { useGetAll } from '../../hooks/tools/useTools';
import { useToolStore } from '../../store/useToolStore';
import TableSkeleton from '../ui/TableSkeleton';
import ToolTable from '../ui/ToolTable';
import type { Tool } from '../../types';
import ToolModal from '../ui/ToolModal';

const ToolsCatalog = () => {
  const { filters } = useToolStore();
  const { data: tools, isLoading, error } = useGetAll();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const filtered = useMemo(() => {
    if (!tools) return [];
    return tools.filter(tool => {
      const search = filters.search?.toLocaleLowerCase();
      const cost = Number(tool.monthly_cost);

      const matchesSearch =
        !search ||
        [
          tool.name,
          tool.vendor,
          tool.category,
          tool.description,
          tool.owner_department,
          tool.active_users_count,
          tool.status,
          tool.monthly_cost,
        ].some(field => {
          if (field !== undefined) {
            return typeof field == 'string'
              ? field?.toLowerCase().includes(search)
              : field.toString().includes(search);
          }
        });

      return (
        matchesSearch &&
        (!filters.status ||
          tool.status?.toLocaleLowerCase() === filters.status) &&
        (!filters.department || tool.owner_department === filters.department) &&
        (!filters.category || tool.category === filters.category) &&
        (!filters.min_cost || cost >= filters.min_cost) &&
        (!filters.max_cost || cost <= filters.max_cost)
      );
    });
  }, [tools, filters]);

  if (isLoading)
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <TableSkeleton />
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-sm text-red-500">
        Erreur de chargement des outils.
      </div>
    );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      {/* Count */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{filtered.length}</span>{' '}
          tools
          {filtered.length !== tools?.length && (
            <span className="text-gray-400">
              {' '}
              (filtered from {tools?.length})
            </span>
          )}
        </span>
      </div>

      <ToolTable
        tools={filtered}
        showActions={true}
        onView={tool => setSelectedTool(tool)}
      />

      {selectedTool && (
        <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </div>
  );
};
export default ToolsCatalog;
