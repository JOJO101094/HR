'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { useUI } from '@/hooks';
import { Product, Category } from '@/utils/types';
import { formatCurrency } from '@/utils/auth';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { showNotification } = useUI();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    barcode: '',
    categoryId: '',
    cost: '',
    markup: '',
    price: '',
    price1: '',
    price2: '',
    price3: '',
    quantity: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm]);

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
    } catch (error) {
      showNotification('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.categoryId) {
        showNotification('warning', 'Please select a category');
        return;
      }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/products/${editingId}` : '/api/products';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed');

      showNotification('success', editingId ? 'Product updated' : 'Product created');
      resetForm();
      loadData();
    } catch (error) {
      showNotification('error', 'Failed to save product');
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      sku: product.sku,
      barcode: product.barcode || '',
      categoryId: product.categoryId,
      cost: product.cost.toString(),
      markup: (product.markup || 0).toString(),
      price: product.price.toString(),
      price1: (product.price1 || '').toString(),
      price2: (product.price2 || '').toString(),
      price3: (product.price3 || '').toString(),
      quantity: product.quantity.toString(),
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed');

      showNotification('success', 'Product deleted');
      loadData();
    } catch (error) {
      showNotification('error', 'Failed to delete');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      sku: '',
      barcode: '',
      categoryId: '',
      cost: '',
      markup: '',
      price: '',
      price1: '',
      price2: '',
      price3: '',
      quantity: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-gray-600">Manage your products and stock</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <FiPlus size={20} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-light border-b-2 border-gray-300">
                  <th className="px-6 py-3 text-left">Product</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-center">Stock</th>
                  <th className="px-6 py-3 text-right">Cost</th>
                  <th className="px-6 py-3 text-right">Markup%</th>
                  <th className="px-6 py-3 text-right">Base Price</th>
                  <th className="px-6 py-3 text-right">Price Tiers</th>
                  <th className="px-6 py-3 text-right">Profit</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const profit = product.price - product.cost;
                  const profitMargin = ((profit / product.price) * 100).toFixed(1);

                  return (
                    <tr key={product.id} className="border-b hover:bg-light transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.sku}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm">{product.category?.name}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            product.quantity > 20
                              ? 'bg-success/10 text-success'
                              : product.quantity > 5
                              ? 'bg-warning/10 text-warning'
                              : 'bg-danger/10 text-danger'
                          }`}
                        >
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">{formatCurrency(product.cost, 'THB')}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-primary">{product.markup || 0}%</span>
                      </td>
                      <td className="px-6 py-4 text-right">{formatCurrency(product.price, 'THB')}</td>
                      <td className="px-6 py-4 text-right text-xs">
                        <div className="space-y-1">
                          {product.price1 && <p>P1: {formatCurrency(product.price1, 'THB')}</p>}
                          {product.price2 && <p>P2: {formatCurrency(product.price2, 'THB')}</p>}
                          {product.price3 && <p>P3: {formatCurrency(product.price3, 'THB')}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-sm">
                          <p className="font-semibold text-success">{formatCurrency(profit, 'THB')}</p>
                          <p className="text-xs text-gray-600">{profitMargin}%</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 hover:bg-light rounded text-secondary"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 hover:bg-light rounded text-danger"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showForm && (
        <div className="modal" onClick={() => resetForm()}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={resetForm} className="text-2xl">×</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Barcode</label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Cost Price (ราคาซื้อมา)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Markup % (ค่าต่างราคา)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.markup}
                    onChange={(e) => setFormData({ ...formData, markup: e.target.value })}
                    className="input"
                    placeholder="e.g. 25"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Base Price (ราคาขาย)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price Tier 1 (P1)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price1}
                    onChange={(e) => setFormData({ ...formData, price1: e.target.value })}
                    className="input"
                    placeholder="Wholesale"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price Tier 2 (P2)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price2}
                    onChange={(e) => setFormData({ ...formData, price2: e.target.value })}
                    className="input"
                    placeholder="Regular"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price Tier 3 (P3)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price3}
                    onChange={(e) => setFormData({ ...formData, price3: e.target.value })}
                    className="input"
                    placeholder="Premium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Save Product
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
