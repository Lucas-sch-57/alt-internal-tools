import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Tools from '@/pages/Tools';
import NavbarLayout from '@/components/layouts/NavbarLayout';

function App() {
  return (
    <Routes>
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tools" element={<Tools />} />
      </Route>
    </Routes>
  );
}

export default App;
