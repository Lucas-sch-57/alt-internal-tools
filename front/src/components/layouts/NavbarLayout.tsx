import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <main className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default NavbarLayout;
