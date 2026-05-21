import {
  Bell,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Settings,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { name: 'Dashboard', link: '/' },
  { name: 'Tools', link: '/tools' },
  { name: 'Analytics', link: '/analytics' },
  { name: 'Settings', link: '/settings' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="rounded-xl bg-blue-600 p-2">
              <Zap color="white" size={18} />
            </div>

            <span className="font-semibold text-gray-900">TechCorp</span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.link}
                end={link.link === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search */}
          {/* Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 w-48 md:w-56">
            <Search size={16} className="shrink-0 text-gray-400" />

            <input
              type="text"
              placeholder="Search tools..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Theme button */}
          {/* Hidden on mobile */}
          <button className="hidden sm:flex min-h-11 min-w-11 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
            <Moon size={18} />
          </button>

          {/* Notifications */}
          <button className="relative flex min-h-11 min-w-11 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
            <Bell size={18} />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Settings */}
          {/* Hidden on mobile */}
          <button className="hidden sm:flex min-h-11 min-w-11 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
            <Settings size={18} />
          </button>

          {/* Profile */}
          {/* Hidden on mobile/tablet */}
          <button className="hidden md:flex items-center gap-2 rounded-xl px-2 py-1 transition-colors hover:bg-gray-100">
            <div className="h-8 w-8 rounded-full bg-gray-200" />

            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {/* Mobile menu button */}
          <button
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile + Tablet menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {/* Mobile search */}
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3">
              <Search size={16} className="shrink-0 text-gray-400" />

              <input
                type="text"
                placeholder="Search tools..."
                className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Nav links */}
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.link}
                className="flex min-h-11 items-center rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile actions */}
            <div className="mt-2 flex items-center gap-2 border-t border-gray-100 pt-3 sm:hidden">
              <button className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <Moon size={18} />
              </button>

              <button className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
