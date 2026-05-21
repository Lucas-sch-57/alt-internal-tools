import KpiSection from '../components/sections/KpisSection';
import RecentToolsSection from '../components/sections/RecentToolsSection';

const Dashboard = () => {
  return (
    <>
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
      <RecentToolsSection />
    </>
  );
};

export default Dashboard;
