'use client';

import { useEffect } from 'react';
import { Loader } from 'lucide-react';

export default function AdminPage() {
  useEffect(() => {
    // Redirect to Django admin at your backend
    const adminUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/admin/`;
    window.location.href = adminUrl;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block mb-4">
          <Loader className="w-12 h-12 text-cyan-400 animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Redirecting to Admin Panel...</h1>
        <p className="text-slate-400">
          Taking you to the Django admin dashboard to manage products, categories, and images.
        </p>
        <p className="text-slate-500 mt-4 text-sm">
          If you are not redirected automatically,{' '}
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/admin/`}
            className="text-cyan-400 hover:text-cyan-300 underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}
