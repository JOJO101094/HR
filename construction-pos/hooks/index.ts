import { useAuthStore, useCartStore, useUIStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { decodeToken } from '@/utils/auth';

export function useAuth() {
  const { user, token, isLoading, isAuthenticated, login, logout, setLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for stored token on mount
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken && !token) {
        const decoded = decodeToken(storedToken);
        if (decoded) {
          setLoading(true);
          // In a real app, verify token on server
          setLoading(false);
        }
      }
    }
  }, [token, setLoading]);

  return { user, token, isLoading, isAuthenticated, login, logout, setLoading, mounted };
}

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateDiscount,
    clearCart,
    getTotalAmount,
    getTotalDiscount,
    getTotalFinal,
  } = useCartStore();

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateDiscount,
    clearCart,
    getTotalAmount,
    getTotalDiscount,
    getTotalFinal,
    itemCount: items.length,
  };
}

export function useUI() {
  const { darkMode, sidebarOpen, notification, toggleDarkMode, toggleSidebar, showNotification, clearNotification } = useUIStore();

  return {
    darkMode,
    sidebarOpen,
    notification,
    toggleDarkMode,
    toggleSidebar,
    showNotification,
    clearNotification,
  };
}

export function usePagination(items: any[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return {
    currentPage,
    totalPages,
    currentItems,
    setCurrentPage,
  };
}

export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, [key]);

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
