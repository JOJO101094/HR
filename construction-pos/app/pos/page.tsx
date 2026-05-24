'use client';

import { useEffect, useState } from 'react';
import { useCart, useUI } from '@/hooks';
import { FiSearch, FiShoppingCart as FiCart, FiPlus, FiMinus, FiX, FiPrinter } from 'react-icons/fi';
import { formatCurrency, calculateTax } from '@/utils/auth';
import { Product, Category } from '@/utils/types';

export default function POSPage() {
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotalAmount, getTotalDiscount, getTotalFinal } = useCart();
  const { showNotification } = useUI();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr'>('cash');
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, categories, selectedCategory, searchTerm]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData.data || []);
      setCategories(categoriesData.data || []);
      showNotification('success', 'Data loaded successfully');
    } catch (error) {
      showNotification('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.barcode?.includes(searchTerm)
      );
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product: Product) => {
    if (product.quantity <= 0) {
      showNotification('warning', 'Product out of stock');
      return;
    }

    addItem({
      ...product,
      cartQuantity: 1,
      cartDiscount: 0,
    });

    showNotification('success', `${product.name} added to cart`);
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      showNotification('warning', 'Cart is empty');
      return;
    }

    try {
      const saleItems = items.map((item) => ({
        productId: item.id,
        quantity: item.cartQuantity,
        price: item.price,
        discount: item.cartDiscount,
        subtotal: item.price * item.cartQuantity - item.cartDiscount,
      }));

      const totalAmount = getTotalAmount();
      const totalDiscount = getTotalDiscount();
      const finalAmount = getTotalFinal();

      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: null,
          totalAmount,
          discountAmount: totalDiscount + discount,
          finalAmount: finalAmount - discount,
          paymentMethod,
          items: saleItems,
          cashierId: 'current-user', // Replace with actual user ID
          notes: '',
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      showNotification('success', 'Sale completed successfully!');
      clearCart();
      setShowCheckout(false);
      setDiscount(0);
    } catch (error) {
      showNotification('error', 'Failed to complete checkout');
    }
  };

  return (
    <div className="p-6 h-screen overflow-hidden flex gap-6">
      {/* Products Section */}
      <div className="flex-1 flex flex-col">
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products or barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            <button onClick={loadData} className="btn-secondary px-6">
              Refresh
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'btn-primary'
                  : 'border border-gray-300 hover:bg-light'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'btn-primary'
                    : 'border border-gray-300 hover:bg-light'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-card p-4 hover:shadow-hover transition-all cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  <div className="h-20 bg-light rounded mb-3 flex items-center justify-center">
                    <span className="text-3xl">📦</span>
                  </div>
                  <h3 className="font-semibold text-sm text-dark mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{product.sku}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{formatCurrency(product.price, 'THB')}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.quantity > 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                    }`}>
                      {product.quantity} pcs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cart Section */}
      <div className="w-full sm:w-96 bg-white rounded-lg shadow-card p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <FiCart size={24} className="text-primary" />
          <h2 className="text-2xl font-bold">Cart</h2>
          <span className="ml-auto badge badge-primary">{items.length}</span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto space-y-3 mb-6">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-500">
              Cart is empty
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-light rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-dark">{item.name}</p>
                    <p className="text-xs text-gray-600">{formatCurrency(item.price, 'THB')}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-danger/10 rounded text-danger"
                  >
                    <FiX size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white rounded border border-gray-300">
                    <button
                      onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                      className="p-1 hover:bg-light"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.cartQuantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                      className="p-1 hover:bg-light"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <span className="font-semibold text-sm">
                    {formatCurrency(item.price * item.cartQuantity, 'THB')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        {items.length > 0 && (
          <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(getTotalAmount(), 'THB')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount:</span>
              <span className="font-semibold text-danger">-{formatCurrency(getTotalDiscount() + discount, 'THB')}</span>
            </div>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                placeholder="Add discount"
                value={discount}
                onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="input text-sm"
              />
            </div>
            <div className="flex justify-between text-lg bg-primary/10 rounded-lg p-3">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-primary text-xl">{formatCurrency(getTotalFinal() - discount, 'THB')}</span>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="input text-sm"
              >
                <option value="cash">💵 Cash</option>
                <option value="card">💳 Card</option>
                <option value="qr">📱 QR Payment</option>
              </select>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="btn-success w-full py-3 font-bold disabled:opacity-50"
          >
            Checkout
          </button>
          <button
            onClick={() => clearCart()}
            disabled={items.length === 0}
            className="btn-danger w-full py-2 disabled:opacity-50"
          >
            Clear Cart
          </button>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-1">
          <p>
            <span className="font-semibold bg-light px-2 py-1 rounded">F1</span> Search
          </p>
          <p>
            <span className="font-semibold bg-light px-2 py-1 rounded">F9</span> Checkout
          </p>
        </div>
      </div>
    </div>
  );
}
