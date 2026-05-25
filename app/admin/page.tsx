'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  LogOut,
  LayoutList,
  FolderOpen,
  Package,
  ShieldCheck,
  AlertCircle,
  Loader,
} from 'lucide-react';
import {
  TabsSection,
  CategoriesSection,
  ProductsSection,
} from './components';

// ============================================================================
// Admin Credentials
// ============================================================================

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

type Section = 'tabs' | 'categories' | 'products';

// ============================================================================
// Login Screen
// ============================================================================

interface LoginScreenProps {
  onLogin: () => void;
}

function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Invalid username or password');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/SKEAM SYMBOL .png"
              alt="SKEAM Technologies"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            SKEAM Technologies
          </h1>
          <p className="text-gray-500 text-sm mt-1">Admin Management Portal</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 p-7 sm:p-8 w-full rounded-xl shadow-sm">
          <div className="mb-7">
            <h2 className="text-xl font-semibold text-gray-900">Sign In</h2>
            <p className="text-gray-500 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={15} className="flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl disabled:opacity-60 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" /> Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            Demo credentials: admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Admin Dashboard
// ============================================================================

interface AdminDashboardProps {
  onLogout: () => void;
}

function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<Section>('tabs');
  const [tabCount, setTabCount] = useState<number | null>(null);
  const [categoryCount, setCategoryCount] = useState<number | null>(null);
  const [productCount, setProductCount] = useState<number | null>(null);

  const sections: {
    id: Section;
    label: string;
    icon: React.ReactNode;
    count: number | null;
  }[] = [
    { id: 'tabs', label: 'Tabs', icon: <LayoutList size={16} />, count: tabCount },
    {
      id: 'categories',
      label: 'Categories',
      icon: <FolderOpen size={16} />,
      count: categoryCount,
    },
    {
      id: 'products',
      label: 'Products',
      icon: <Package size={16} />,
      count: productCount,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          {/* Left: Logo + title */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/SKEAM SYMBOL .png"
              alt="SKEAM"
              width={36}
              height={36}
              className="object-contain"
            />
            <div>
              <span className="text-gray-900 font-semibold text-base sm:text-lg leading-tight">SKEAM Technologies</span>
              <p className="text-gray-500 text-xs hidden sm:block">Admin Panel</p>
            </div>
          </div>
          {/* Right: User chip + logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-3 py-1.5">
              <ShieldCheck size={14} className="text-blue-600" />
              <span className="text-gray-700 text-xs font-medium">admin</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl px-2 py-1.5 transition-colors text-sm"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline text-xs font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mobile Nav Tabs */}
        <div className="lg:hidden mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-1.5 flex gap-1 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-colors whitespace-nowrap
                  ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {section.icon} {section.label}
                {section.count !== null && (
                  <span className="text-xs opacity-75">({section.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <nav className="bg-white border border-gray-200 rounded-xl p-4 space-y-1.5 sticky top-24">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider px-3 mb-3">
                Navigation
              </p>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2.5 text-sm
                    ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <span
                    className={
                      activeSection === section.id ? 'text-white' : 'text-blue-600'
                    }
                  >
                    {section.icon}
                  </span>
                  <span className="flex-1">{section.label}</span>
                  {section.count !== null && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeSection === section.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {section.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeSection === 'tabs' && <TabsSection onCountChange={setTabCount} />}
            {activeSection === 'categories' && (
              <CategoriesSection onCountChange={setCategoryCount} />
            )}
            {activeSection === 'products' && (
              <ProductsSection onCountChange={setProductCount} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Admin Page (Root Component)
// ============================================================================

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);

  if (!isAuthed) {
    return <LoginScreen onLogin={() => setIsAuthed(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthed(false)} />;
}
