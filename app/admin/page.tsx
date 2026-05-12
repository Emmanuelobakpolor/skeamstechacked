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

    // Simulate a small delay for better UX
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-blue-950 to-[#0f172a] flex items-center justify-center px-4">
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Branding */}
        <div className="text-center mb-8 animate-in">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/SKEAM SYMBOL .png"
              alt="SKEAM Technologies"
              width={60}
              height={60}
              className="object-contain drop-shadow-[0_0_16px_rgba(6,182,212,0.4)]"
            />
          </div>
          <h1 className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent text-3xl sm:text-4xl font-bold">
            SKEAM Technologies
          </h1>
          <p className="text-blue-400 text-sm mt-1">Admin Management Portal</p>
        </div>

        {/* Form Card */}
        <div className="glass-morphism-dark p-7 sm:p-8 w-full rounded-2xl animate-scale-up">
          <div className="mb-7">
            <h2 className="text-xl font-bold text-white">Sign In</h2>
            <p className="text-blue-400 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-950/60 border border-red-500/40 rounded-xl p-3 flex items-center gap-2 text-red-300 text-sm animate-in">
                <AlertCircle size={15} className="flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm text-blue-200 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-blue-900/50 border border-blue-700/50 hover:border-blue-600 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-white placeholder-blue-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm text-blue-200 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-blue-900/50 border border-blue-700/50 hover:border-blue-600 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-white placeholder-blue-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-2"
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

          <p className="text-center text-blue-500/70 text-xs mt-6">
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-blue-950 to-[#0f172a]">
      {/* Header */}
      <header className="bg-blue-950/60 backdrop-blur-md border-b border-blue-800/50 sticky top-0 z-40">
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
              <span className="text-white font-bold text-base sm:text-lg leading-tight">SKEAM Technologies</span>
              <p className="text-blue-400 text-xs hidden sm:block">Admin Panel</p>
            </div>
          </div>
          {/* Right: User chip + logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-blue-900/40 border border-blue-700/40 rounded-xl px-3 py-1.5">
              <ShieldCheck size={14} className="text-cyan-400" />
              <span className="text-blue-200 text-xs font-medium">admin</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-blue-400 hover:text-red-400 hover:bg-red-900/20 rounded-xl px-2 py-1.5 transition-all text-sm"
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
          <div className="glass-effect-dark p-1.5 flex gap-1 overflow-x-auto custom-scrollbar">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs transition-all whitespace-nowrap
                  ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'text-blue-300 hover:bg-blue-800/50'
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
            <nav className="glass-effect-dark p-4 space-y-1.5 sticky top-24">
              <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                Navigation
              </p>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2.5 text-sm
                    ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                        : 'text-blue-300 hover:bg-blue-800/50 hover:text-white'
                    }`}
                >
                  <span
                    className={
                      activeSection === section.id ? 'text-white' : 'text-cyan-500'
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
                          : 'bg-blue-800/60 text-blue-400'
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
