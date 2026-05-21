import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
    </>
  );
};

export default NavbarLayout;
