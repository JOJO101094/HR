'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  trend?: string;
}

export default function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-dark">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <div className="text-2xl">{icon}</div>
        </div>
      </div>
      {trend && <p className="text-xs text-gray-600">{trend}</p>}
    </div>
  );
}
