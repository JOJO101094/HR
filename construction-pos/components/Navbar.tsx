'use client';

import { useAuth, useUI } from '@/hooks';
import { FiMenu, FiMoon, FiSun, FiBell } from 'react-icons/fi';

export default function Navbar() {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode, toggleSidebar } = useUI();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-light rounded-lg lg:hidden"
          >
            <FiMenu size={20} />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="p-2 hover:bg-light rounded-lg relative">
            <FiBell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-light rounded-lg"
          >
            {darkMode ? (
              <FiSun size={20} className="text-yellow-500" />
            ) : (
              <FiMoon size={20} className="text-gray-700" />
            )}
          </button>

          {/* User Profile */}
          {user && (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-dark">{user.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
