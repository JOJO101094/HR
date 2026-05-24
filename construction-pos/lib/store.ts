import create from 'zustand';
import { AuthState, User, CartItem, Sale } from '@/utils/types';

// Auth Store
export const useAuthStore = create<AuthState & {
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  login: (user, token) => set({ user, token, isAuthenticated: true, isLoading: false }),
  logout: () => set({ user: null, token: null, isAuthenticated: false, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// Cart Store
export const useCartStore = create<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateDiscount: (productId: string, discount: number) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  getTotalDiscount: () => number;
  getTotalFinal: () => number;
}>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map(i =>
          i.id === item.id
            ? { ...i, cartQuantity: i.cartQuantity + item.cartQuantity }
            : i
        ),
      };
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter(i => i.id !== productId),
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map(i =>
      i.id === productId ? { ...i, cartQuantity: Math.max(0, quantity) } : i
    ).filter(i => i.cartQuantity > 0),
  })),
  updateDiscount: (productId, discount) => set((state) => ({
    items: state.items.map(i =>
      i.id === productId ? { ...i, cartDiscount: discount } : i
    ),
  })),
  clearCart: () => set({ items: [] }),
  getTotalAmount: () => {
    const items = get().items;
    return items.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  },
  getTotalDiscount: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.cartDiscount, 0);
  },
  getTotalFinal: () => {
    const total = get().getTotalAmount();
    const discount = get().getTotalDiscount();
    return Math.max(0, total - discount);
  },
}));

// UI Store
export const useUIStore = create<{
  darkMode: boolean;
  sidebarOpen: boolean;
  notification: { type: string; message: string } | null;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  showNotification: (type: string, message: string) => void;
  clearNotification: () => void;
}>((set) => ({
  darkMode: false,
  sidebarOpen: true,
  notification: null,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  showNotification: (type, message) => set({ notification: { type, message } }),
  clearNotification: () => set({ notification: null }),
}));

// Settings Store
export const useSettingsStore = create<{
  storeName: string;
  currency: string;
  taxRate: number;
  setSettings: (settings: any) => void;
}>((set) => ({
  storeName: 'Construction Store',
  currency: 'THB',
  taxRate: 0,
  setSettings: (settings) => set(settings),
}));
