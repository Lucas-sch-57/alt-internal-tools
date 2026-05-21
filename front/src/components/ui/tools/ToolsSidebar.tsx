import { X } from 'lucide-react';
import { CATEGORIES, DEPARTMENTS, STATUSES } from '@/constants/tools';
import { useToolStore } from '@/store/useToolStore';

const ToolsSidebar = () => {
  const { filters, setFilter, resetFilters } = useToolStore();
  const hasFilters = Object.values(filters).some(
    v => v !== undefined && v !== ''
  );

  return (
    <div className="h-full flex flex-col p-6 gap-6 overflow-y-auto">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset all
            </button>
          )}
        </h2>
      </div>
      {/* search */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Search
        </label>
        <input
          type="text"
          placeholder="Search tools..."
          value={filters.search ?? ''}
          onChange={e => setFilter('search', e.target.value || undefined)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
      {/* Status */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Status
        </label>
        <div className="flex flex-col gap-1">
          {STATUSES.map(s => (
            <button
              key={s.value}
              onClick={() =>
                setFilter(
                  'status',
                  filters.status === s.value ? undefined : s.value
                )
              }
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left min-h-11 ${
                filters.status === s.value
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 border border-transparent'
              }`}
            >
              {s.label}
              {filters.status === s.value && (
                <X size={14} className="shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Department */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Department
        </label>
        <select
          value={filters.department ?? ''}
          onChange={e => setFilter('department', e.target.value || undefined)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
        >
          <option value="">All departments</option>
          {DEPARTMENTS.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Category
        </label>
        <select
          value={filters.category ?? ''}
          onChange={e => setFilter('category', e.target.value || undefined)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
        >
          <option value="">All categories</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {/* Cost range */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Monthly Cost
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min €"
            min={0}
            value={filters.min_cost ?? ''}
            onChange={e =>
              setFilter(
                'min_cost',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <span className="text-gray-400 shrink-0">—</span>
          <input
            type="number"
            placeholder="Max €"
            min={0}
            value={filters.max_cost ?? ''}
            onChange={e =>
              setFilter(
                'max_cost',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </div>
  );
};
export default ToolsSidebar;
