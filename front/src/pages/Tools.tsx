import { useState } from 'react';
import ToolsSidebar from '../components/ui/ToolsSidebar';
import { SlidersHorizontal } from 'lucide-react';

const Tools = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside
          className={` fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16 transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:pt-0 lg:z-auto`}
        >
          <ToolsSidebar />
        </aside>
      </div>
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 min-h-11"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>
    </div>
  );
};

export default Tools;
