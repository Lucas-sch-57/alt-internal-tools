import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Tools from '@/pages/Tools';
import NavbarLayout from '@/components/layouts/NavbarLayout';
import AnalyticsPage from '@/pages/AnalyticsPage';

function App() {
  return (
    <Routes>
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
