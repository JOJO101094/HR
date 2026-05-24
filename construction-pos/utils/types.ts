// Types for the application

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'cashier' | 'warehouse';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  category?: Category;
  price: number;
  cost: number;
  quantity: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  debt: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleItem {
  id: string;
  saleId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  discount: number;
  subtotal: number;
  createdAt: Date;
}

export interface Sale {
  id: string;
  saleNumber: string;
  customerId?: string;
  customer?: Customer;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: 'cash' | 'card' | 'qr';
  isPaid: boolean;
  notes?: string;
  cashierId: string;
  createdAt: Date;
  updatedAt: Date;
  saleItems?: SaleItem[];
  payment?: Payment;
}

export interface Payment {
  id: string;
  saleId: string;
  sale?: Sale;
  amount: number;
  method: string;
  reference?: string;
  createdAt: Date;
}

export interface InventoryLog {
  id: string;
  productId: string;
  product?: Product;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  note?: string;
  createdAt: Date;
}

export interface Settings {
  id: string;
  storeName: string;
  storePhone?: string;
  storeAddress?: string;
  currency: string;
  taxRate: number;
  receiptHeader?: string;
  receiptFooter?: string;
  printPageWidth: number;
  darkMode: boolean;
  updatedAt: Date;
}

export interface CartItem extends Product {
  cartQuantity: number;
  cartDiscount: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
