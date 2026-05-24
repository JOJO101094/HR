'use client';

import { useState } from 'react';
import { FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import { useUI } from '@/hooks';

export default function SettingsPage() {
  const { showNotification } = useUI();
  const [settings, setSettings] = useState({
    storeName: 'Construction Store',
    storePhone: '02-1111111',
    storeAddress: 'Bangkok, Thailand',
    currency: 'THB',
    taxRate: '7',
    receiptHeader: 'CONSTRUCTION STORE',
    receiptFooter: 'Thank you for your purchase!',
    darkMode: false,
  });

  const [userSettings, setUserSettings] = useState({
    email: 'admin@pos.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    lastBackup: '2024-01-10 10:30',
  });

  const handleSettingsChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSaveSettings = () => {
    showNotification('success', 'Settings saved successfully');
  };

  const handleBackup = () => {
    showNotification('success', 'Database backed up successfully');
  };

  const handleRestore = () => {
    showNotification('success', 'Database restored successfully');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage store settings and preferences</p>
      </div>

      {/* Store Settings */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Store Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleSettingsChange('storeName', e.target.value)}
              className="input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                value={settings.storePhone}
                onChange={(e) => handleSettingsChange('storePhone', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleSettingsChange('currency', e.target.value)}
                className="input"
              >
                <option value="THB">Thai Baht (THB)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Address</label>
            <textarea
              value={settings.storeAddress}
              onChange={(e) => handleSettingsChange('storeAddress', e.target.value)}
              className="input"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={settings.taxRate}
                onChange={(e) => handleSettingsChange('taxRate', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Print Page Width (mm)</label>
              <input
                type="number"
                defaultValue="80"
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Receipt Header</label>
            <textarea
              value={settings.receiptHeader}
              onChange={(e) => handleSettingsChange('receiptHeader', e.target.value)}
              className="input"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Receipt Footer</label>
            <textarea
              value={settings.receiptFooter}
              onChange={(e) => handleSettingsChange('receiptFooter', e.target.value)}
              className="input"
              rows={2}
            />
          </div>

          <button onClick={handleSaveSettings} className="btn-primary flex items-center gap-2 w-full justify-center py-3">
            <FiSave size={20} />
            Save Settings
          </button>
        </div>
      </div>

      {/* User Settings */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">User Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={userSettings.email}
              disabled
              className="input opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Current Password</label>
            <input
              type={userSettings.showPassword ? 'text' : 'password'}
              value={userSettings.currentPassword}
              onChange={(e) => setUserSettings({ ...userSettings, currentPassword: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">New Password</label>
            <input
              type={userSettings.showPassword ? 'text' : 'password'}
              value={userSettings.newPassword}
              onChange={(e) => setUserSettings({ ...userSettings, newPassword: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type={userSettings.showPassword ? 'text' : 'password'}
              value={userSettings.confirmPassword}
              onChange={(e) => setUserSettings({ ...userSettings, confirmPassword: e.target.value })}
              className="input"
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={userSettings.showPassword}
              onChange={(e) => setUserSettings({ ...userSettings, showPassword: e.target.checked })}
            />
            <span className="text-sm">Show password</span>
          </label>

          <button className="btn-primary w-full py-3">Change Password</button>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Backup & Recovery</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Last Backup: {backupSettings.lastBackup}</p>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={backupSettings.autoBackup}
                onChange={(e) => setBackupSettings({ ...backupSettings, autoBackup: e.target.checked })}
              />
              <span className="text-sm">Enable automatic backups</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Backup Frequency</label>
            <select
              value={backupSettings.backupFrequency}
              onChange={(e) => setBackupSettings({ ...backupSettings, backupFrequency: e.target.value })}
              className="input"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={handleBackup} className="btn-secondary py-3 font-semibold">
              Backup Now
            </button>
            <button onClick={handleRestore} className="btn-secondary py-3 font-semibold">
              Restore Database
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">System Information</h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Application Version:</span> 1.0.0
          </p>
          <p>
            <span className="font-semibold">Database:</span> SQLite Local
          </p>
          <p>
            <span className="font-semibold">Platform:</span> Offline-First PWA
          </p>
          <p>
            <span className="font-semibold">Last Updated:</span> 2024-01-10
          </p>
        </div>
      </div>
    </div>
  );
}
