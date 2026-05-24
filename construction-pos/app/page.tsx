'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { isValidEmail } from '@/utils/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@pos.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      if (!isValidEmail(email)) {
        setError('Invalid email format');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.data.token);
      login(data.data.user, data.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full p-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">🏗</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Construction POS</h1>
          <p className="text-white/80">Point of Sale System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6">
            <h2 className="text-2xl font-bold text-white">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-danger/10 border border-danger rounded-lg">
                <p className="text-danger text-sm">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pos.com"
                className="input"
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div className="mb-8">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-light rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Admin:</span> admin@pos.com / 123456
              </p>
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Cashier:</span> cashier@pos.com / 123456
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Warehouse:</span> warehouse@pos.com / 123456
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          © 2024 Construction POS. All rights reserved.
        </p>
      </div>
    </div>
  );
}
