import { Calendar } from 'lucide-react';
import { useRecentTools } from '../../hooks/tools/useTools';
import TableSkeleton from '../ui/TableSkeleton';
import ToolTable from '../ui/ToolTable';

const RecentToolsSection = () => {
  const { data: tools, isLoading, isError } = useRecentTools();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Tools</h2>
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-500" />
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>
      </div>

      {/* Content */}
      {isLoading && <TableSkeleton />}
      {isError && (
        <div className="px-6 pb-6 text-sm text-red-500">
          Erreur de chargement des outils.
        </div>
      )}
      {tools && tools.length > 0 && <ToolTable tools={tools} />}
    </div>
  );
};

export default RecentToolsSection;
