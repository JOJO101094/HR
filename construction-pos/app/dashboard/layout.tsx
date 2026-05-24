'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUI } from '@/hooks';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Notification from '@/components/Notification';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, mounted } = useAuth();
  const { sidebarOpen } = useUI();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && mounted && !isAuthenticated) {
      router.push('/');
    }
  }, [isClient, mounted, isAuthenticated, router]);

  if (!isClient || !mounted || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Notification */}
      <Notification />
    </div>
  );
}
