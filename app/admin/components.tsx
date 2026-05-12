'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Loader,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertCircle,
} from 'lucide-react';
import {
  AdminTab,
  AdminCategory,
  AdminProduct,
  fetchTabs,
  fetchCategories,
  fetchProducts,
  createTab,
  updateTab,
  deleteTab,
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from './api';

// ============================================================================
// Modal Component
// ============================================================================

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-3 sm:px-4">
      <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex justify-between items-center px-4 sm:px-8 py-5 sm:py-7 border-b border-slate-700/50 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900/50 backdrop-blur-xl rounded-t-3xl sm:rounded-t-3xl">
          <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent truncate">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 rounded-lg p-2 transition-all flex-shrink-0 ml-4"
          >
            <X size={20} className="sm:w-[24px] sm:h-[24px]" />
          </button>
        </div>
        <div className="p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

// ============================================================================
// Toast Component
// ============================================================================

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === 'success'
      ? 'bg-green-500/20 text-green-300 border-green-500/30'
      : 'bg-red-500/20 text-red-300 border-red-500/30';

  return (
    <div
      className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 px-3 sm:px-4 py-3 rounded-lg border ${bgColor} max-w-sm z-40`}
    >
      <div className="flex items-center gap-2 text-sm sm:text-base">
        {type === 'error' && <AlertCircle size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />}
        <span className="line-clamp-2">{message}</span>
      </div>
    </div>
  );
}

// ============================================================================
// Tab Form
// ============================================================================

interface TabFormProps {
  tab?: AdminTab;
  onSubmit: (data: Partial<AdminTab>) => Promise<void>;
  onCancel: () => void;
}

function TabForm({ tab, onSubmit, onCancel }: TabFormProps) {
  const [formData, setFormData] = useState(
    tab || {
      name: '',
      display_name: '',
      description: '',
      order: 0,
      is_active: true,
      is_hardcoded: false,
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Name <span className="text-cyan-400">*</span></label>
        <div className="relative">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="e.g., automation"
            required
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Display Name <span className="text-cyan-400">*</span></label>
        <input
          type="text"
          value={formData.display_name}
          onChange={(e) =>
            setFormData({ ...formData, display_name: e.target.value })
          }
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
          placeholder="e.g., Automation Systems"
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
          placeholder="Optional description"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Display Order</label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) =>
            setFormData({ ...formData, order: parseInt(e.target.value) })
          }
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
          placeholder="0"
        />
      </div>
      <div className="space-y-2 bg-slate-700/20 rounded-xl p-3 sm:p-4 border border-slate-600/30 mt-2">
        <label className="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-cyan-300 transition-colors group">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            }
            className="rounded-md w-5 h-5 cursor-pointer accent-cyan-500 border border-slate-600 group-hover:border-cyan-400"
          />
          <span className="text-xs sm:text-sm font-medium">Active</span>
        </label>
        <label className="flex items-center gap-3 text-slate-500 cursor-not-allowed opacity-60">
          <input
            type="checkbox"
            checked={formData.is_hardcoded}
            disabled
            className="rounded-md w-5 h-5 border border-slate-600"
          />
          <span className="text-xs sm:text-sm font-medium">Hardcoded (read-only)</span>
        </label>
      </div>
      <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:shadow-none transition-all text-xs sm:text-base"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader size={14} className="animate-spin" /> Saving...
            </span>
          ) : (
            'Save Tab'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold py-2.5 sm:py-3 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all text-xs sm:text-base"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// Tabs Section
// ============================================================================

export function TabsSection() {
  const [tabs, setTabs] = useState<AdminTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTab, setEditingTab] = useState<AdminTab | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadTabs();
  }, []);

  async function loadTabs() {
    try {
      setLoading(true);
      const data = await fetchTabs();
      setTabs(data);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to load tabs',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData: Partial<AdminTab>) {
    try {
      if (editingTab) {
        await updateTab(editingTab.id, formData);
        setToast({ message: 'Tab updated', type: 'success' });
      } else {
        await createTab(formData as any);
        setToast({ message: 'Tab created', type: 'success' });
      }
      setIsModalOpen(false);
      setEditingTab(null);
      loadTabs();
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Operation failed',
        type: 'error',
      });
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTab(id);
      setToast({ message: 'Tab deleted', type: 'success' });
      setDeletingId(null);
      loadTabs();
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Delete failed',
        type: 'error',
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-cyan-400" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Shop Tabs</h2>
        <button
          onClick={() => {
            setEditingTab(null);
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          Add New Tab
        </button>
      </div>

      <div className="space-y-2">
        {tabs.map((tab) =>
          deletingId === tab.id ? (
            <div key={tab.id} className="bg-slate-700 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <span className="text-red-300 text-sm sm:text-base">Delete "{tab.display_name}"?</span>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleDelete(tab.id)}
                  className="flex-1 sm:flex-none px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 sm:flex-none px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={tab.id} className="bg-slate-700 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{tab.display_name}</h3>
                <p className="text-xs sm:text-sm text-slate-400 line-clamp-1">{tab.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    setEditingTab(tab);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-blue-400 hover:text-cyan-300 transition-colors"
                >
                  <Pencil size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={() => setDeletingId(tab.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <Modal
        title={editingTab ? 'Edit Tab' : 'Create Tab'}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTab(null);
        }}
      >
        <TabForm
          tab={editingTab || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTab(null);
          }}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

// ============================================================================
// Category Form
// ============================================================================

interface CategoryFormProps {
  category?: AdminCategory;
  tabs: AdminTab[];
  onSubmit: (data: Partial<AdminCategory>) => Promise<void>;
  onCancel: () => void;
}

function CategoryForm({
  category,
  tabs,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const [formData, setFormData] = useState<Partial<AdminCategory>>(
    category || {
      tab: null,
      name: '',
      subtitle: '',
      is_active: true,
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Tab</label>
        <select
          value={formData.tab || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              tab: e.target.value ? parseInt(e.target.value) : null,
            })
          }
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
        >
          <option value="">None</option>
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.display_name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Name <span className="text-cyan-400">*</span></label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
          placeholder="e.g., Solar Panels"
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Subtitle</label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) =>
            setFormData({ ...formData, subtitle: e.target.value })
          }
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
          placeholder="Optional subtitle"
        />
      </div>
      <div className="bg-slate-700/20 rounded-xl p-3 sm:p-4 border border-slate-600/30">
        <label className="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-cyan-300 transition-colors group">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            }
            className="rounded-md w-5 h-5 cursor-pointer accent-cyan-500 border border-slate-600 group-hover:border-cyan-400"
          />
          <span className="text-xs sm:text-sm font-medium">Active</span>
        </label>
      </div>
      <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:shadow-none transition-all text-xs sm:text-base"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader size={14} className="animate-spin" /> Saving...
            </span>
          ) : (
            'Save Category'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold py-2.5 sm:py-3 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all text-xs sm:text-base"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// Categories Section
// ============================================================================

export function CategoriesSection() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [tabs, setTabs] = useState<AdminTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [catData, tabData] = await Promise.all([
        fetchCategories(),
        fetchTabs(),
      ]);
      setCategories(catData);
      setTabs(tabData);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to load data',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData: Partial<AdminCategory>) {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
        setToast({ message: 'Category updated', type: 'success' });
      } else {
        await createCategory(formData as any);
        setToast({ message: 'Category created', type: 'success' });
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      loadData();
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Operation failed',
        type: 'error',
      });
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteCategory(id);
      setToast({ message: 'Category deleted', type: 'success' });
      setDeletingId(null);
      loadData();
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Delete failed',
        type: 'error',
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-cyan-400" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Categories</h2>
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          Add New Category
        </button>
      </div>

      <div className="space-y-2">
        {categories.map((category) =>
          deletingId === category.id ? (
            <div key={category.id} className="bg-slate-700 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <span className="text-red-300 text-sm sm:text-base">Delete "{category.name}"?</span>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 sm:flex-none px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 sm:flex-none px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={category.id} className="bg-slate-700 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{category.name}</h3>
                <p className="text-xs sm:text-sm text-slate-400 line-clamp-1">
                  {category.tab_name ? `${category.tab_name} - ` : ''}
                  {category.subtitle}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-blue-400 hover:text-cyan-300 transition-colors"
                >
                  <Pencil size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={() => setDeletingId(category.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <Modal
        title={editingCategory ? 'Edit Category' : 'Create Category'}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
      >
        <CategoryForm
          category={editingCategory || undefined}
          tabs={tabs}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

// ============================================================================
// Product Form
// ============================================================================

interface ProductFormProps {
  product?: AdminProduct;
  categories: AdminCategory[];
  tabs: AdminTab[];
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

function ProductForm({
  product,
  categories,
  tabs,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    category: product?.category || '',
    name: product?.name || '',
    description: product?.description || '',
    application: product?.application || '',
    spec_speed: product?.spec_speed || '',
    spec_weight: product?.spec_weight || '',
    spec_voltage: product?.spec_voltage || '',
    spec_power: product?.spec_power || '',
    spec_storage: product?.spec_storage || '',
    spec_connectivity: product?.spec_connectivity || '',
    is_active: product?.is_active ?? true,
  });
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('category', String(formData.category));
      fd.append('name', formData.name);
      fd.append('description', formData.description);
      fd.append('application', formData.application);
      fd.append('spec_speed', formData.spec_speed);
      fd.append('spec_weight', formData.spec_weight);
      fd.append('spec_voltage', formData.spec_voltage);
      fd.append('spec_power', formData.spec_power);
      fd.append('spec_storage', formData.spec_storage);
      fd.append('spec_connectivity', formData.spec_connectivity);
      fd.append('is_active', String(formData.is_active));
      if (newImageFile) {
        fd.append('image', newImageFile);
      }
      await onSubmit(fd);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 max-h-[70vh] overflow-y-auto pr-2 sm:pr-0">
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Category <span className="text-cyan-400">*</span></label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
          required
        >
          <option value="">Select category</option>
          {tabs.map((tab) => (
            <optgroup key={tab.id} label={tab.display_name}>
              {categories
                .filter((cat) => cat.tab === tab.id)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Product Name <span className="text-cyan-400">*</span></label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
          placeholder="Product name"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Description <span className="text-cyan-400">*</span></label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all h-16 sm:h-20 resize-none"
          placeholder="Product description"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Application</label>
        <input
          type="text"
          value={formData.application}
          onChange={(e) =>
            setFormData({ ...formData, application: e.target.value })
          }
          className="w-full bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
          placeholder="Where it's used"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Specifications</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'spec_speed', label: 'Speed' },
            { key: 'spec_weight', label: 'Weight' },
            { key: 'spec_voltage', label: 'Voltage' },
            { key: 'spec_power', label: 'Power' },
            { key: 'spec_storage', label: 'Storage' },
            { key: 'spec_connectivity', label: 'Connectivity' },
          ].map(({ key, label }) => (
            <input
              key={key}
              type="text"
              placeholder={label}
              value={formData[key as keyof typeof formData] as string}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [key]: e.target.value,
                })
              }
              className="bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
          ))}
        </div>
      </div>

      <div className="space-y-2 bg-slate-700/20 rounded-xl p-3 sm:p-4 border border-slate-600/30">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">Product Image</label>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex gap-2">
            {product?.image_url && !newImageFile && (
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-slate-700 border border-slate-600 flex-shrink-0 shadow-md">
                <Image
                  src={product.image_url}
                  alt="Current"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {newImageFile && (
              <img
                src={URL.createObjectURL(newImageFile)}
                alt="New"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-lg border border-cyan-400/50 flex-shrink-0 shadow-md shadow-cyan-500/20"
              />
            )}
          </div>
          <label className="flex-1 flex items-center justify-center px-3 py-2.5 sm:py-3 bg-slate-700/50 border-2 border-dashed border-slate-600/50 hover:border-cyan-400 rounded-lg transition-all cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <div className="text-center">
              <p className="text-xs text-slate-400 group-hover:text-cyan-300 font-medium">
                {newImageFile ? '✓ Image selected' : 'Click to upload'}
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-slate-700/20 rounded-xl p-3 sm:p-4 border border-slate-600/30">
        <label className="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-cyan-300 transition-colors group">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            }
            className="rounded-md w-5 h-5 cursor-pointer accent-cyan-500 border border-slate-600 group-hover:border-cyan-400"
          />
          <span className="text-xs sm:text-sm font-medium">Active Product</span>
        </label>
      </div>

      <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:shadow-none transition-all text-xs sm:text-base"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader size={14} className="animate-spin" /> Saving...
            </span>
          ) : (
            'Save Product'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold py-2.5 sm:py-3 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all text-xs sm:text-base"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// Products Section
// ============================================================================

export function ProductsSection() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [tabs, setTabs] = useState<AdminTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [prodData, catData, tabData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchTabs(),
      ]);
      setProducts(prodData);
      setCategories(catData);
      setTabs(tabData);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to load data',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData: FormData) {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        setToast({ message: 'Product updated', type: 'success' });
      } else {
        await createProduct(formData);
        setToast({ message: 'Product created', type: 'success' });
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      loadData();
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Operation failed',
        type: 'error',
      });
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteProduct(id);
      setToast({ message: 'Product deleted', type: 'success' });
      setDeletingId(null);
      loadData();
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Delete failed',
        type: 'error',
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-cyan-400" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Products</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          Add New Product
        </button>
      </div>

      <div className="space-y-2">
        {products.map((product) =>
          deletingId === product.id ? (
            <div key={product.id} className="bg-slate-700 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <span className="text-red-300 text-sm sm:text-base">Delete "{product.name}"?</span>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 sm:flex-none px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 sm:flex-none px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={product.id} className="bg-slate-700 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:gap-4 gap-3 justify-between sm:items-center">
              {product.image_url && (
                <div className="w-12 sm:w-16 h-12 sm:h-16 flex-shrink-0 rounded overflow-hidden bg-slate-600">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate text-sm sm:text-base">{product.name}</h3>
                <p className="text-xs sm:text-sm text-slate-400 truncate">{product.category_name}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {product.description}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-blue-400 hover:text-cyan-300 transition-colors"
                >
                  <Pencil size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={() => setDeletingId(product.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <Modal
        title={editingProduct ? 'Edit Product' : 'Create Product'}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
      >
        <ProductForm
          product={editingProduct || undefined}
          categories={categories}
          tabs={tabs}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
