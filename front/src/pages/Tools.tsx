import { useState } from 'react';
import ToolsSidebar from '../components/ui/ToolsSidebar';
import { Plus, SlidersHorizontal } from 'lucide-react';
import ToolsCatalog from '../components/sections/ToolsCatalog';
import CreateToolModal from '../components/ui/CreateToolModal';

const Tools = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [createdModalOpen, setCreateModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16 transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:pt-0 lg:z-auto`}
        >
          <ToolsSidebar />
        </aside>
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Tools Catalog
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and monitor your organization's software tools
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filters toggle — mobile only */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 min-h-11"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              {/* Add tool */}
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors min-h-11 cursor-pointer"
                onClick={() => setCreateModalOpen(true)}
              >
                <Plus size={16} />
                Add Tool
              </button>
            </div>
          </div>

          {/* Catalog */}
          <ToolsCatalog />
          {createdModalOpen && (
            <CreateToolModal onClose={() => setCreateModalOpen(false)} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Tools;
