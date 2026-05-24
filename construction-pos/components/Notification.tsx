'use client';

import { useUI } from '@/hooks';
import { FiX } from 'react-icons/fi';
import { useEffect } from 'react';

export default function Notification() {
  const { notification, clearNotification } = useUI();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(clearNotification, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  const colorClasses = {
    success: 'bg-success text-white',
    error: 'bg-danger text-white',
    warning: 'bg-warning text-dark',
    info: 'bg-primary text-white',
  };

  return (
    <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 animate-in slide-in-from-right ${colorClasses[notification.type as keyof typeof colorClasses] || colorClasses.info}`}>
      <p className="font-semibold">{notification.message}</p>
      <button onClick={clearNotification} className="p-1 hover:bg-white/20 rounded">
        <FiX size={20} />
      </button>
    </div>
  );
}
