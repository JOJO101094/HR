'use client';

import { useState } from 'react';
import { FiDownload, FiFilter } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { formatCurrency, formatDate } from '@/utils/auth';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('sales');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Sample data for reports
  const salesReportData = [
    { date: '2024-01-01', orderId: 'ORD-001', amount: 2500, discount: 0, final: 2500, method: 'cash' },
    { date: '2024-01-02', orderId: 'ORD-002', amount: 3200, discount: 200, final: 3000, method: 'card' },
    { date: '2024-01-03', orderId: 'ORD-003', amount: 1800, discount: 100, final: 1700, method: 'cash' },
  ];

  const inventoryReportData = [
    { product: 'Portland Cement', sku: 'CEMENT-001', quantity: 50, value: 7500, status: 'Good' },
    { product: 'Steel Bar', sku: 'STEEL-001', quantity: 5, value: 225, status: 'Low' },
    { product: 'Red Brick', sku: 'BRICK-001', quantity: 200, value: 1000, status: 'Good' },
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Construction Store Report', 10, 10);
    doc.text(`Type: ${reportType}`, 10, 20);
    doc.text(`Generated: ${formatDate(new Date())}`, 10, 30);
    doc.save(`report-${reportType}.pdf`);
  };

  const handleExportExcel = () => {
    const data = reportType === 'sales' ? salesReportData : inventoryReportData;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, `report-${reportType}.xlsx`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-gray-600">Sales, Inventory, and Profit Reports</p>
      </div>

      {/* Filters */}
      <div className="card space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter size={20} className="text-primary" />
          <h2 className="text-lg font-bold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="input"
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="profit">Profit Report</option>
              <option value="customer">Customer Debt Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">From Date</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">To Date</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="input"
            />
          </div>

          <div className="flex items-end gap-2">
            <button className="btn-primary flex-1">Apply Filter</button>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <button onClick={handleExportPDF} className="btn-secondary flex items-center gap-2">
            <FiDownload size={18} />
            Export PDF
          </button>
          <button onClick={handleExportExcel} className="btn-secondary flex items-center gap-2">
            <FiDownload size={18} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Report Table */}
      <div className="card overflow-hidden">
        {reportType === 'sales' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Sales Report</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-light border-b-2 border-gray-300">
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Order ID</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                    <th className="px-6 py-3 text-right">Discount</th>
                    <th className="px-6 py-3 text-right">Final</th>
                    <th className="px-6 py-3 text-left">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {salesReportData.map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-light">
                      <td className="px-6 py-4">{row.date}</td>
                      <td className="px-6 py-4 font-semibold">{row.orderId}</td>
                      <td className="px-6 py-4 text-right">{formatCurrency(row.amount, 'THB')}</td>
                      <td className="px-6 py-4 text-right text-danger">-{formatCurrency(row.discount, 'THB')}</td>
                      <td className="px-6 py-4 text-right font-bold text-success">{formatCurrency(row.final, 'THB')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          row.method === 'cash' ? 'bg-success/10 text-success' :
                          row.method === 'card' ? 'bg-primary/10 text-primary' :
                          'bg-secondary/10 text-secondary'
                        }`}>
                          {row.method.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'inventory' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Inventory Report</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-light border-b-2 border-gray-300">
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">SKU</th>
                    <th className="px-6 py-3 text-center">Quantity</th>
                    <th className="px-6 py-3 text-right">Value</th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryReportData.map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-light">
                      <td className="px-6 py-4 font-semibold">{row.product}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.sku}</td>
                      <td className="px-6 py-4 text-center font-semibold">{row.quantity}</td>
                      <td className="px-6 py-4 text-right">{formatCurrency(row.value, 'THB')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          row.status === 'Good' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
