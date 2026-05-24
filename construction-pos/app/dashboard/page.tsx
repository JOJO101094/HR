'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiTrendingUp, FiShoppingCart, FiBox, FiAlertCircle } from 'react-icons/fi';
import StatCard from '@/components/StatCard';
import { formatCurrency } from '@/utils/auth';

interface DashboardStats {
  totalSales: number;
  totalRevenue: number;
  totalOrders: number;
  lowStockItems: number;
  dailySales: any[];
  topProducts: any[];
  monthlyRevenue: any[];
}

const COLORS = ['#FF6B35', '#004E89', '#F7931E', '#FFC107', '#28A745', '#DC3545'];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 156,
    totalRevenue: 45250,
    totalOrders: 89,
    lowStockItems: 12,
    dailySales: [
      { date: 'Jan 1', sales: 2400, revenue: 2400 },
      { date: 'Jan 2', sales: 1398, revenue: 2210 },
      { date: 'Jan 3', sales: 2800, revenue: 2290 },
      { date: 'Jan 4', sales: 3908, revenue: 2000 },
      { date: 'Jan 5', sales: 4800, revenue: 2181 },
      { date: 'Jan 6', sales: 3800, revenue: 2500 },
    ],
    topProducts: [
      { name: 'Portland Cement', value: 2400 },
      { name: 'Steel Bar', value: 1810 },
      { name: 'Brick', value: 1520 },
      { name: 'Wood Plank', value: 1150 },
      { name: 'Power Drill', value: 950 },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 35000 },
      { month: 'Feb', revenue: 42000 },
      { month: 'Mar', revenue: 48000 },
      { month: 'Apr', revenue: 45000 },
      { month: 'May', revenue: 52000 },
      { month: 'Jun', revenue: 55000 },
    ],
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Construction Store POS System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={stats.totalSales.toString()}
          icon={<FiShoppingCart />}
          color="primary"
          trend="+12% this month"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue, 'THB')}
          icon={<FiTrendingUp />}
          color="success"
          trend="+8% this month"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          icon={<FiBox />}
          color="secondary"
          trend="+5% this month"
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStockItems.toString()}
          icon={<FiAlertCircle />}
          color="danger"
          trend="Needs attention"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Sales Chart */}
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-bold text-dark mb-4">Daily Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#FF6B35" />
              <Bar dataKey="revenue" fill="#004E89" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="card">
          <h2 className="text-xl font-bold text-dark mb-4">Top Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.topProducts}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark mb-4">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#FF6B35" strokeWidth={2} dot={{ fill: '#FF6B35' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card border-l-4 border-primary">
          <h3 className="text-lg font-bold text-dark mb-2">Quick Start</h3>
          <p className="text-gray-600 mb-4">Start a new transaction</p>
          <a href="/pos" className="btn-primary inline-block">
            Go to POS
          </a>
        </div>
        <div className="card border-l-4 border-secondary">
          <h3 className="text-lg font-bold text-dark mb-2">Manage Inventory</h3>
          <p className="text-gray-600 mb-4">Add, edit, or delete products</p>
          <a href="/inventory" className="btn-secondary inline-block">
            Go to Inventory
          </a>
        </div>
        <div className="card border-l-4 border-success">
          <h3 className="text-lg font-bold text-dark mb-2">View Reports</h3>
          <p className="text-gray-600 mb-4">Check sales and profit reports</p>
          <a href="/reports" className="btn-success inline-block">
            Go to Reports
          </a>
        </div>
      </div>
    </div>
  );
}
