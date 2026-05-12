'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ContentFile {
  id: string;
  name: string;
  type: 'banner' | 'discount-ad';
  url: string;
  uploadedAt: string;
  size: number;
}

export default function AdminContentManagement() {
  const [files, setFiles] = useState<ContentFile[]>([]);
  const [uploadType, setUploadType] = useState<'banner' | 'discount-ad'>('banner');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (fileList: File[]) => {
    for (const file of fileList) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload image files only');
        continue;
      }

      const url = URL.createObjectURL(file);
      const newFile: ContentFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: uploadType,
        url: url,
        uploadedAt: new Date().toLocaleString(),
        size: file.size,
      };

      setFiles(prev => [newFile, ...prev]);
    }
  };

  const deleteFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.url);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const bannerFiles = files.filter(f => f.type === 'banner');
  const discountFiles = files.filter(f => f.type === 'discount-ad');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Admin Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">⚙️ Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage your content, banners, and promotional ads</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-semibold">Total Content</p>
                <p className="text-4xl font-bold text-white mt-2">{files.length}</p>
              </div>
              <div className="text-5xl">📁</div>
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-semibold">Banners</p>
                <p className="text-4xl font-bold text-blue-400 mt-2">{bannerFiles.length}</p>
              </div>
              <div className="text-5xl">🖼️</div>
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-semibold">Discount Ads</p>
                <p className="text-4xl font-bold text-red-400 mt-2">{discountFiles.length}</p>
              </div>
              <div className="text-5xl">🏷️</div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Content</h2>

          {/* Type Selector */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setUploadType('banner')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                uploadType === 'banner'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              🖼️ Banners
            </button>
            <button
              onClick={() => setUploadType('discount-ad')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                uploadType === 'discount-ad'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              🏷️ Discount Ads
            </button>
          </div>

          {/* Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-3 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-slate-600 bg-slate-700/50 hover:border-blue-400'
            }`}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer block">
              <div className="text-5xl mb-3">📤</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Drag & drop files here
              </h3>
              <p className="text-slate-400 mb-4">or click to browse your computer</p>
              <button
                type="button"
                onClick={() => document.getElementById('file-input')?.click()}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Choose Files
              </button>
            </label>
          </div>
        </div>

        {/* Files Management */}
        {files.length > 0 && (
          <div className="space-y-12">
            {/* Banners */}
            {bannerFiles.length > 0 && (
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-2xl font-bold text-white">🖼️ Banners</h3>
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full font-bold">
                    {bannerFiles.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bannerFiles.map(file => (
                    <div
                      key={file.id}
                      className="bg-slate-700 rounded-xl overflow-hidden border border-slate-600 hover:border-blue-500 transition"
                    >
                      <div className="relative w-full h-48 bg-slate-600">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-white truncate mb-1">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400 mb-4">
                          {formatFileSize(file.size)} • {file.uploadedAt}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteFile(file.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discount Ads */}
            {discountFiles.length > 0 && (
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-2xl font-bold text-white">🏷️ Discount Ads</h3>
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full font-bold">
                    {discountFiles.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {discountFiles.map(file => (
                    <div
                      key={file.id}
                      className="bg-slate-700 rounded-xl overflow-hidden border border-slate-600 hover:border-red-500 transition"
                    >
                      <div className="relative w-full h-48 bg-slate-600">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-white truncate mb-1">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400 mb-4">
                          {formatFileSize(file.size)} • {file.uploadedAt}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteFile(file.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {files.length === 0 && (
          <div className="text-center py-16 bg-slate-800 rounded-2xl border-2 border-dashed border-slate-600">
            <p className="text-2xl text-slate-400 mb-2">No content uploaded yet</p>
            <p className="text-slate-500">Upload your first banner or discount ad to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}
