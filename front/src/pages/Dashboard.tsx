import KpiSection from '@/components/sections/KpisSection';
import RecentToolsSection from '@/components/sections/RecentToolsSection';
import PageHeader from '@/components/ui/PageHeader';

const Dashboard = () => {
  return (
    <main className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
      <PageHeader
        title="Internal Tools Dashboard"
        subtitle="Monitor and manage your organization's software tools and expenses"
      />
      <KpiSection />
      <RecentToolsSection />
    </main>
  );
};

export default Dashboard;
