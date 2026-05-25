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
  LayoutList,
  FolderOpen,
  Package,
  CheckCircle2,
  XCircle,
  Shield,
  Search,
  ImageIcon,
  Upload,
  Zap,
  ChevronDown,
} from 'lucide-react';
import {
  AdminTab,
  AdminCategory,
  AdminProduct,
  ProductImageItem,
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
  addProductImage,
  deleteProductImage,
} from './api';

// ============================================================================
// Constants
// ============================================================================

const INPUT_CLS =
  'w-full bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors';

// ============================================================================
// Shared Sub-Components
// ============================================================================

interface StatusBadgeProps {
  active: boolean;
  labelOn?: string;
  labelOff?: string;
}

function StatusBadge({ active, labelOn = 'Active', labelOff = 'Inactive' }: StatusBadgeProps) {
  return active ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
      <CheckCircle2 size={10} /> {labelOn}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
      <XCircle size={10} /> {labelOff}
    </span>
  );
}

function HardcodedBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-gray-600 border border-blue-500/30">
      <Shield size={10} /> Hardcoded
    </span>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className=" p-12 text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-blue-900/40 border border-blue-700/40 flex items-center justify-center text-gray-500">
        {icon}
      </div>
      <div>
        <p className="text-blue-100 font-semibold text-base mb-1">{title}</p>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

interface SectionSkeletonProps {
  rows?: number;
  grid?: boolean;
}

function SectionSkeleton({ rows = 3, grid = false }: SectionSkeletonProps) {
  const items = Array.from({ length: rows });
  if (grid) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((_, i) => (
          <div key={i} className="glass-effect-dark rounded-2xl overflow-hidden animate-pulse">
            <div className="h-40 bg-blue-900/40" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-blue-800/50 rounded w-3/4" />
              <div className="h-3 bg-blue-800/30 rounded w-1/2" />
              <div className="h-3 bg-blue-800/30 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {items.map((_, i) => (
        <div key={i} className="glass-effect-dark rounded-2xl p-4 animate-pulse flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-800/50 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-blue-800/50 rounded w-1/2" />
            <div className="h-3 bg-blue-800/30 rounded w-3/4" />
          </div>
          <div className="h-7 w-16 bg-blue-800/30 rounded-lg flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  onAdd: () => void;
  addLabel: string;
  children?: React.ReactNode;
}

function SectionHeader({ title, count, icon, onAdd, addLabel, children }: SectionHeaderProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-800/50 border border-blue-600/40 flex items-center justify-center text-blue-600">
            {icon}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">{title}</h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-800/60 border border-blue-600/40 text-gray-600 text-xs font-semibold">
            {count}
          </span>
        </div>
        <button
          onClick={onAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl  transition-all duration-200 text-sm font-semibold"
        >
          <Plus size={15} /> {addLabel}
        </button>
      </div>
      {children}
    </div>
  );
}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] bg-slate-900/95 backdrop-blur-md rounded-2xl animate-scale-up flex flex-col shadow-2xl shadow-black/50">
        <div className="flex justify-between items-center px-5 sm:px-8 py-4 sm:py-5 border-b border-blue-400/20 bg-blue-900/30 flex-shrink-0">
          <h2 className="gradient-text text-xl sm:text-2xl font-bold flex-1 truncate">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-cyan-300 hover:bg-blue-800/60 rounded-xl p-2 transition-all flex-shrink-0 ml-4"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8">{children}</div>
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
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-down max-w-sm w-[calc(100vw-2.5rem)] sm:w-auto
        ${
          isSuccess
            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 backdrop-blur-md'
            : 'bg-red-950/80 border-red-500/40 text-red-300 backdrop-blur-md'
        }`}
    >
      <span className="flex-shrink-0 mt-0.5">
        {isSuccess ? (
          <CheckCircle2 size={16} className="text-emerald-400" />
        ) : (
          <AlertCircle size={16} className="text-red-400" />
        )}
      </span>
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="flex-shrink-0 ml-1 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>
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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
        <label className="block text-xs sm:text-sm font-semibold text-gray-700">Name <span className="text-blue-600">*</span></label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onBlur={() => setTouched((p) => ({ ...p, name: true }))}
          className={`${INPUT_CLS} ${touched.name && !formData.name ? 'border-red-500/70 focus:border-red-500' : ''}`}
          placeholder="e.g., automation"
          required
        />
        {touched.name && !formData.name && (
          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
            <AlertCircle size={10} /> Required
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700">Display Name <span className="text-blue-600">*</span></label>
        <input
          type="text"
          value={formData.display_name}
          onChange={(e) =>
            setFormData({ ...formData, display_name: e.target.value })
          }
          onBlur={() => setTouched((p) => ({ ...p, display_name: true }))}
          className={`${INPUT_CLS} ${touched.display_name && !formData.display_name ? 'border-red-500/70 focus:border-red-500' : ''}`}
          placeholder="e.g., Automation Systems"
          required
        />
        {touched.display_name && !formData.display_name && (
          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
            <AlertCircle size={10} /> Required
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className={INPUT_CLS}
          placeholder="Optional description"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700">Display Order</label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) =>
            setFormData({ ...formData, order: e.target.value === '' ? 0 : parseInt(e.target.value) })
          }
          className={INPUT_CLS}
          placeholder="0"
        />
      </div>
      <div className="space-y-2 bg-blue-900/30 rounded-xl p-3 sm:p-4 border border-blue-700/40 mt-2">
        <label className="flex items-center gap-3 text-gray-600 cursor-pointer hover:text-cyan-300 transition-colors group">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            }
            className="rounded-md w-5 h-5 cursor-pointer accent-cyan-500 border border-blue-600 group-hover:border-cyan-400"
          />
          <span className="text-xs sm:text-sm font-medium">Active</span>
        </label>
        <label className="flex items-center gap-3 text-blue-500 cursor-not-allowed opacity-60">
          <input
            type="checkbox"
            checked={formData.is_hardcoded}
            disabled
            className="rounded-md w-5 h-5 border border-blue-600"
          />
          <span className="text-xs sm:text-sm font-medium">Hardcoded (read-only)</span>
        </label>
      </div>
      <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg  disabled:opacity-50 disabled:shadow-none transition-all text-xs sm:text-base"
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

interface TabsSectionProps {
  onCountChange?: (count: number) => void;
}

export function TabsSection({ onCountChange }: TabsSectionProps) {
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
      onCountChange?.(data.length);
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
    return <SectionSkeleton rows={3} />;
  }

  return (
    <div>
      <SectionHeader
        title="Shop Tabs"
        count={tabs.length}
        icon={<LayoutList size={20} />}
        onAdd={() => {
          setEditingTab(null);
          setIsModalOpen(true);
        }}
        addLabel="Add New Tab"
      />

      {tabs.length === 0 ? (
        <EmptyState
          icon={<LayoutList size={28} />}
          title="No tabs yet"
          description="Create your first shop tab to organise categories."
        />
      ) : (
        <div className="space-y-3">
          {tabs.map((tab) =>
            deletingId === tab.id ? (
              <div
                key={tab.id}
                className="bg-red-950/40 border border-red-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                <p className="flex-1 text-sm text-red-300">
                  Permanently delete <span className="font-semibold text-white">"{tab.display_name}"</span>? This cannot be undone.
                </p>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleDelete(tab.id)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeletingId(null)}
                    className="px-3 py-1.5 bg-blue-800/50 hover:bg-blue-700 text-gray-600 rounded-lg text-xs font-semibold border border-blue-600/50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={tab.id}
                className="group bg-blue-800/40 border border-blue-600/50 hover:border-blue-400 hover:bg-blue-800/70 rounded-2xl p-4 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="hidden sm:flex w-9 h-9 rounded-xl bg-blue-900/50 items-center justify-center text-blue-600 flex-shrink-0">
                  <LayoutList size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">{tab.display_name}</h3>
                    <StatusBadge active={tab.is_active} />
                    {tab.is_hardcoded && <HardcodedBadge />}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{tab.description || 'No description'}</p>
                  <p className="text-xs text-blue-500 mt-0.5">Order: {tab.order}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => {
                      setEditingTab(tab);
                      setIsModalOpen(true);
                    }}
                    className="p-2 rounded-lg text-gray-600 hover:text-cyan-300 hover:bg-blue-700/50 transition-all"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeletingId(tab.id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
        <label className="block text-xs sm:text-sm font-semibold text-gray-700">Tab</label>
        <select
          value={formData.tab || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              tab: e.target.value ? parseInt(e.target.value) : null,
            })
          }
          className={INPUT_CLS}
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
        <label className="block text-xs sm:text-sm font-semibold text-gray-700">Name <span className="text-blue-600">*</span></label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onBlur={() => setTouched((p) => ({ ...p, name: true }))}
          className={`${INPUT_CLS} ${touched.name && !formData.name ? 'border-red-500/70 focus:border-red-500' : ''}`}
          placeholder="e.g., Solar Panels"
          required
        />
        {touched.name && !formData.name && (
          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
            <AlertCircle size={10} /> Required
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700">Subtitle</label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) =>
            setFormData({ ...formData, subtitle: e.target.value })
          }
          className={INPUT_CLS}
          placeholder="Optional subtitle"
        />
      </div>
      <div className="bg-blue-900/30 rounded-xl p-3 sm:p-4 border border-blue-700/40">
        <label className="flex items-center gap-3 text-gray-600 cursor-pointer hover:text-cyan-300 transition-colors group">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            }
            className="rounded-md w-5 h-5 cursor-pointer accent-cyan-500 border border-blue-600 group-hover:border-cyan-400"
          />
          <span className="text-xs sm:text-sm font-medium">Active</span>
        </label>
      </div>
      <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg  disabled:opacity-50 disabled:shadow-none transition-all text-xs sm:text-base"
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

interface CategoriesSectionProps {
  onCountChange?: (count: number) => void;
}

export function CategoriesSection({ onCountChange }: CategoriesSectionProps) {
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
      onCountChange?.(catData.length);
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
    return <SectionSkeleton rows={4} />;
  }

  return (
    <div>
      <SectionHeader
        title="Categories"
        count={categories.length}
        icon={<FolderOpen size={16} />}
        onAdd={() => {
          setEditingCategory(null);
          setIsModalOpen(true);
        }}
        addLabel="Add Category"
      />

      {categories.length === 0 ? (
        <EmptyState
          icon={<FolderOpen size={28} />}
          title="No categories yet"
          description="Add a category and associate it with a tab."
        />
      ) : (
        <div className="space-y-3">
          {categories.map((category) =>
            deletingId === category.id ? (
              <div
                key={category.id}
                className="bg-red-950/40 border border-red-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                <p className="flex-1 text-sm text-red-300">
                  Permanently delete <span className="font-semibold text-white">"{category.name}"</span>? This cannot be undone.
                </p>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeletingId(null)}
                    className="px-3 py-1.5 bg-blue-800/50 hover:bg-blue-700 text-gray-600 rounded-lg text-xs font-semibold border border-blue-600/50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={category.id}
                className="group bg-blue-800/40 border border-blue-600/50 hover:border-blue-400 hover:bg-blue-800/70 rounded-2xl p-4 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="hidden sm:flex w-9 h-9 rounded-xl bg-blue-900/50 items-center justify-center text-blue-600 flex-shrink-0">
                  <FolderOpen size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">{category.name}</h3>
                    <StatusBadge active={category.is_active} />
                  </div>
                  {category.subtitle && (
                    <p className="text-xs text-gray-600 truncate">{category.subtitle}</p>
                  )}
                  {category.tab_name && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-700/40 border border-blue-600/40 text-gray-600">
                      {category.tab_name}
                    </span>
                  )}
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setIsModalOpen(true);
                    }}
                    className="p-2 rounded-lg text-gray-600 hover:text-cyan-300 hover:bg-blue-700/50 transition-all"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeletingId(category.id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

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
// Product Image Gallery Component
// ============================================================================

interface ProductImageGalleryProps {
  productId: number;
  images: ProductImageItem[];
  onChange: (updated: ProductImageItem[]) => void;
}

function ProductImageGallery({ productId, images, onChange }: ProductImageGalleryProps) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        files.map((f) => addProductImage(productId, f))
      );
      onChange([...images, ...uploaded]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleDelete(imageId: number) {
    try {
      await deleteProductImage(productId, imageId);
      onChange(images.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  }

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-20 h-20 rounded-xl overflow-hidden border border-blue-600/40 group"
            >
              <Image src={img.image_url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                className="absolute top-1 right-1 p-0.5 bg-red-600/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
      <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-600/40 hover:border-cyan-400 bg-blue-900/20 hover:bg-blue-900/40 cursor-pointer transition-all">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
        {uploading ? (
          <>
            <Loader size={14} className="animate-spin text-blue-600" />
            <span className="text-xs text-gray-600">Uploading...</span>
          </>
        ) : (
          <>
            <Upload size={14} className="text-gray-500" />
            <span className="text-xs text-gray-600">Add images</span>
          </>
        )}
      </label>
    </div>
  );
}

// ============================================================================
// Product Model Image Gallery Component
// ============================================================================


// ============================================================================
// Product Form
// ============================================================================

interface ProductFormProps {
  product?: AdminProduct;
  categories: AdminCategory[];
  tabs: AdminTab[];
  onSubmit: (formData: FormData) => Promise<AdminProduct>;
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
  const [savedProductId, setSavedProductId] = useState<number | null>(product?.id ?? null);
  const [galleryImages, setGalleryImages] = useState<ProductImageItem[]>(product?.images ?? []);
  const [pendingImages, setPendingImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    specs: true,
    images: true,
  });

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
      const savedProduct = await onSubmit(fd);
      setSavedProductId(savedProduct.id);

      // Upload any pending images from before first save
      if (pendingImages.length > 0 && savedProduct.id) {
        setUploadingImages(true);
        try {
          const uploaded = await Promise.all(
            pendingImages.map((f) => addProductImage(savedProduct.id, f))
          );
          setGalleryImages((prev) => [...prev, ...uploaded]);
          setPendingImages([]);
        } catch (error) {
          console.error('Error uploading pending images:', error);
          alert('Some images failed to upload');
        } finally {
          setUploadingImages(false);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Basic Information Section */}
      <div className="border border-blue-700/40 rounded-xl overflow-hidden bg-blue-900/20">
        <button
          type="button"
          onClick={() => toggleSection('basic')}
          className="w-full p-4 flex items-center justify-between hover:bg-blue-900/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Package size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">Basic Information</span>
          </div>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform ${expandedSections.basic ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.basic && (
          <div className="border-t border-blue-700/40 p-4 space-y-4 bg-blue-900/10">
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700">Category <span className="text-blue-600">*</span></label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={INPUT_CLS}
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
              <label className="block text-xs sm:text-sm font-semibold text-gray-700">Product Name <span className="text-blue-600">*</span></label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                className={`${INPUT_CLS} ${touched.name && !formData.name ? 'border-red-500/70 focus:border-red-500' : ''}`}
                placeholder="Product name"
                required
              />
              {touched.name && !formData.name && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={10} /> Required
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700">Description <span className="text-blue-600">*</span></label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                onBlur={() => setTouched((p) => ({ ...p, description: true }))}
                className={`${INPUT_CLS} h-20 sm:h-24 resize-none`}
                placeholder="Product description"
                required
              />
              {touched.description && !formData.description && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={10} /> Required
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700">Application</label>
              <input
                type="text"
                value={formData.application}
                onChange={(e) =>
                  setFormData({ ...formData, application: e.target.value })
                }
                className={INPUT_CLS}
                placeholder="Where it's used"
              />
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-blue-700/30">
              <input
                id="active_checkbox"
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="rounded-md w-5 h-5 cursor-pointer accent-cyan-500 border border-blue-600 hover:border-cyan-400 transition-colors"
              />
              <label htmlFor="active_checkbox" className="text-xs sm:text-sm font-medium text-gray-600 cursor-pointer">
                Active Product
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Technical Specifications Section */}
      <div className="border border-blue-700/40 rounded-xl overflow-hidden bg-blue-900/20">
        <button
          type="button"
          onClick={() => toggleSection('specs')}
          className="w-full p-4 flex items-center justify-between hover:bg-blue-900/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">Technical Specifications</span>
          </div>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform ${expandedSections.specs ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.specs && (
          <div className="border-t border-blue-700/40 p-4 bg-blue-900/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className={INPUT_CLS}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Images Section */}
      <div className="border border-blue-700/40 rounded-xl overflow-hidden bg-blue-900/20">
        <button
          type="button"
          onClick={() => toggleSection('images')}
          className="w-full p-4 flex items-center justify-between hover:bg-blue-900/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ImageIcon size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">Product Images</span>
          </div>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform ${expandedSections.images ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.images && (
          <div className="border-t border-blue-700/40 p-4 space-y-4 bg-blue-900/10">
            {savedProductId ? (
              <>
                <ProductImageGallery
                  productId={savedProductId}
                  images={galleryImages}
                  onChange={setGalleryImages}
                />
                {uploadingImages && (
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <Loader size={12} className="animate-spin" /> Uploading...
                  </p>
                )}
              </>
            ) : (
              <>
                {pendingImages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {pendingImages.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-2.5 py-1.5 bg-blue-900/40 border border-blue-600/40 rounded-lg text-xs"
                      >
                        <span className="text-gray-600 truncate max-w-xs">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => setPendingImages((p) => p.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 flex-shrink-0"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-blue-600/50 hover:border-cyan-400/60 bg-blue-900/20 hover:bg-blue-900/40 transition-all cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setPendingImages((p) => [...p, ...Array.from(e.target.files ?? [])])
                    }
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={24} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-600 group-hover:text-cyan-300 font-medium">
                        Drag images here or click to select
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Upload after saving</p>
                    </div>
                  </div>
                </label>
              </>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-3 rounded-lg  disabled:opacity-50 disabled:shadow-none transition-all text-xs sm:text-base"
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
          className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold py-3 sm:py-3 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all text-xs sm:text-base"
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

interface ProductsSectionProps {
  onCountChange?: (count: number) => void;
}

export function ProductsSection({ onCountChange }: ProductsSectionProps) {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [tabs, setTabs] = useState<AdminTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState<number | ''>('');

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
      onCountChange?.(prodData.length);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to load data',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategoryId === '' || p.category === filterCategoryId;
    return matchesSearch && matchesCategory;
  });

  async function handleSubmit(formData: FormData): Promise<AdminProduct> {
    try {
      let result: AdminProduct;
      if (editingProduct) {
        result = await updateProduct(editingProduct.id, formData);
        setToast({ message: 'Product updated', type: 'success' });
        setIsModalOpen(false);
        setEditingProduct(null);
        loadData();
      } else {
        result = await createProduct(formData);
        setToast({ message: 'Product created — add images and models now', type: 'success' });
        setEditingProduct(result);
        // Keep modal open for new products so user can add images/models immediately
      }
      return result;
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Operation failed',
        type: 'error',
      });
      throw error;
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
    return <SectionSkeleton rows={6} grid={true} />;
  }

  return (
    <div>
      <SectionHeader
        title="Products"
        count={products.length}
        icon={<Package size={16} />}
        onAdd={() => {
          setEditingProduct(null);
          setIsModalOpen(true);
        }}
        addLabel="Add Product"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-blue-900/50 border border-blue-700/50 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-blue-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
          </div>
          <select
            value={filterCategoryId}
            onChange={(e) => setFilterCategoryId(e.target.value === '' ? '' : Number(e.target.value))}
            className="bg-blue-900/50 border border-blue-700/50 focus:border-cyan-400 rounded-xl px-3 py-2 text-sm text-white focus:outline-none transition-all sm:w-44"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </SectionHeader>

      {filteredProducts.length === 0 && !loading ? (
        <EmptyState
          icon={<Package size={28} />}
          title={searchQuery || filterCategoryId ? 'No products match your filter' : 'No products yet'}
          description={
            searchQuery || filterCategoryId
              ? 'Try clearing the search or category filter.'
              : 'Add your first product to get started.'
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProducts.map((product) =>
            deletingId === product.id ? (
              <div
                key={product.id}
                className="bg-red-950/40 border border-red-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 col-span-full sm:col-span-1"
              >
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                <p className="flex-1 text-sm text-red-300">
                  Permanently delete <span className="font-semibold text-white">"{product.name}"</span>? This cannot be undone.
                </p>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeletingId(null)}
                    className="px-3 py-1.5 bg-blue-800/50 hover:bg-blue-700 text-gray-600 rounded-lg text-xs font-semibold border border-blue-600/50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={product.id}
                className="group relative bg-blue-800/40 border border-blue-600/50 hover:border-blue-400 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col"
              >
                <div className="relative h-40 bg-blue-900/40 flex-shrink-0">
                  {product.image_url ? (
                    <Image src={product.image_url} alt={product.name} fill className="object-contain p-2" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-600">
                      <ImageIcon size={32} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <StatusBadge active={product.is_active} />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col gap-1">
                  <h3 className="font-semibold text-white text-sm truncate">{product.name}</h3>
                  <span className="text-xs text-blue-600 font-medium">{product.category_name}</span>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 flex-1">{product.description}</p>
                </div>

                <div className="absolute inset-0 bg-blue-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setDeletingId(product.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-800/80 hover:bg-red-700 text-red-200 rounded-xl text-sm font-semibold transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

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
