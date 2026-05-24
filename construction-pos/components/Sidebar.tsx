'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, useUI } from '@/hooks';
import { FiHome, FiShoppingCart, FiBox, FiFileText, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const { sidebarOpen, toggleSidebar } = useUI();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    router.push('/');
  };

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: FiHome },
    { href: '/pos', label: 'POS', icon: FiShoppingCart },
    { href: '/inventory', label: 'Inventory', icon: FiBox },
    { href: '/reports', label: 'Reports', icon: FiFileText },
    { href: '/settings', label: 'Settings', icon: FiSettings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-secondary to-secondary/90 text-white transition-all duration-300 flex flex-col shadow-lg fixed lg:relative h-screen z-40`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">🏗</span>
              </div>
              {sidebarOpen && <span className="font-bold text-lg">POS</span>}
            </Link>
            <button onClick={toggleSidebar} className="lg:hidden">
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(href)
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-all"
          >
            <FiLogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
