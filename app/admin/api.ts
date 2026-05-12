/**
 * Admin API Client
 * Typed fetch helpers for all CRUD operations on Tabs, Categories, and Products
 */

// ============================================================================
// URL Configuration
// ============================================================================

const raw = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';
const BASE = raw.endsWith('/api') ? raw.slice(0, -4) : raw;
const ADMIN = `${BASE}/api/shop/admin`;

// ============================================================================
// Type Definitions
// ============================================================================

export interface AdminTab {
  id: number;
  name: string;
  display_name: string;
  description: string;
  order: number;
  is_active: boolean;
  is_hardcoded: boolean;
  created_at: string;
}

export interface AdminCategory {
  id: number;
  tab: number | null;
  tab_name: string | null;
  name: string;
  subtitle: string;
  is_active: boolean;
  created_at: string;
}

export interface ProductImageItem {
  id: number;
  image_url: string;
  order: number;
}

export interface AdminProduct {
  id: number;
  category: number;
  category_name: string;
  name: string;
  description: string;
  application: string;
  image: File | null;
  image_url: string | null;
  images: ProductImageItem[];
  spec_speed: string;
  spec_weight: string;
  spec_voltage: string;
  spec_power: string;
  spec_storage: string;
  spec_connectivity: string;
  is_active: boolean;
  created_at: string;
}

export type CreateTabInput = Omit<
  AdminTab,
  'id' | 'created_at'
>;
export type UpdateTabInput = Partial<CreateTabInput>;

export type CreateCategoryInput = Omit<
  AdminCategory,
  'id' | 'created_at' | 'tab_name'
>;
export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export type CreateProductInput = Omit<
  AdminProduct,
  'id' | 'created_at' | 'category_name' | 'image_url' | 'images'
> & {
  image?: File;
};
export type UpdateProductInput = Partial<CreateProductInput>;

// ============================================================================
// Tab API Helpers
// ============================================================================

export async function fetchTabs(): Promise<AdminTab[]> {
  const res = await fetch(`${ADMIN}/tabs/`);
  if (!res.ok) throw new Error(`Failed to fetch tabs: ${res.status}`);
  return res.json();
}

export async function fetchTabDetail(id: number): Promise<AdminTab> {
  const res = await fetch(`${ADMIN}/tabs/${id}/`);
  if (!res.ok) throw new Error(`Failed to fetch tab: ${res.status}`);
  return res.json();
}

export async function createTab(data: CreateTabInput): Promise<AdminTab> {
  const res = await fetch(`${ADMIN}/tabs/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create tab: ${res.status}`);
  return res.json();
}

export async function updateTab(
  id: number,
  data: UpdateTabInput
): Promise<AdminTab> {
  const res = await fetch(`${ADMIN}/tabs/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update tab: ${res.status}`);
  return res.json();
}

export async function deleteTab(id: number): Promise<void> {
  const res = await fetch(`${ADMIN}/tabs/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete tab: ${res.status}`);
}

// ============================================================================
// Category API Helpers
// ============================================================================

export async function fetchCategories(tabId?: number): Promise<AdminCategory[]> {
  const url = new URL(`${ADMIN}/categories/`);
  if (tabId !== undefined) {
    url.searchParams.append('tab', String(tabId));
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  return res.json();
}

export async function fetchCategoryDetail(id: number): Promise<AdminCategory> {
  const res = await fetch(`${ADMIN}/categories/${id}/`);
  if (!res.ok) throw new Error(`Failed to fetch category: ${res.status}`);
  return res.json();
}

export async function createCategory(
  data: CreateCategoryInput
): Promise<AdminCategory> {
  const res = await fetch(`${ADMIN}/categories/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create category: ${res.status}`);
  return res.json();
}

export async function updateCategory(
  id: number,
  data: UpdateCategoryInput
): Promise<AdminCategory> {
  const res = await fetch(`${ADMIN}/categories/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update category: ${res.status}`);
  return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${ADMIN}/categories/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete category: ${res.status}`);
}

// ============================================================================
// Product API Helpers
// ============================================================================

export async function fetchProducts(
  categoryId?: number
): Promise<AdminProduct[]> {
  const url = new URL(`${ADMIN}/products/`);
  if (categoryId !== undefined) {
    url.searchParams.append('category', String(categoryId));
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

export async function fetchProductDetail(id: number): Promise<AdminProduct> {
  const res = await fetch(`${ADMIN}/products/${id}/`);
  if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
  return res.json();
}

export async function createProduct(
  formData: FormData
): Promise<AdminProduct> {
  const res = await fetch(`${ADMIN}/products/`, {
    method: 'POST',
    body: formData,
    // Don't set Content-Type header; let browser set multipart boundary
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      `Failed to create product: ${res.status} - ${JSON.stringify(errorData)}`
    );
  }
  return res.json();
}

export async function updateProduct(
  id: number,
  formData: FormData
): Promise<AdminProduct> {
  const res = await fetch(`${ADMIN}/products/${id}/`, {
    method: 'PATCH',
    body: formData,
    // Don't set Content-Type header; let browser set multipart boundary
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      `Failed to update product: ${res.status} - ${JSON.stringify(errorData)}`
    );
  }
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${ADMIN}/products/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete product: ${res.status}`);
}

// ============================================================================
// Product Image API Helpers
// ============================================================================

export async function addProductImage(
  productId: number,
  file: File
): Promise<ProductImageItem> {
  const fd = new FormData();
  fd.append('image', file);
  const res = await fetch(`${ADMIN}/products/${productId}/images/`, {
    method: 'POST',
    body: fd,
  });
  if (!res.ok) throw new Error(`Failed to add product image: ${res.status}`);
  return res.json();
}

export async function deleteProductImage(
  productId: number,
  imageId: number
): Promise<void> {
  const res = await fetch(`${ADMIN}/products/${productId}/images/${imageId}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete product image: ${res.status}`);
}

