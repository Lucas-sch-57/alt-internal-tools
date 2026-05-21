import { Calendar } from 'lucide-react';
import Navbar from '../components/layouts/Navbar';
import KpiSection from '../components/sections/KpisSection';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* Header */}
        <header className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Internal Tools Dashboard
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
            Monitor and manage your organization's software tools and expenses
          </p>
        </header>

        {/* KPI Cards */}
        {/* Mobile: 1 col | Tablet: 2 cols | Desktop: 4 cols */}
        <KpiSection />

        {/* Table section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Tools
            </h2>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-500" />
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
