'use client';

import { useState } from 'react';
import Image from 'next/image';

interface UploadedFile {
  id: string;
  name: string;
  type: 'banner' | 'discount-ad';
  url: string;
  uploadedAt: string;
  size: number;
}

export default function UploadsSection() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
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
      const newFile: UploadedFile = {
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
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Content Management
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Upload and manage your banners, discount ads, and promotional content
          </p>
        </div>

        {/* Upload Type Tabs */}
        <div className="flex gap-3 mb-12 justify-center flex-wrap">
          <button
            onClick={() => setUploadType('banner')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              uploadType === 'banner'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50 scale-105'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            🖼️ Banners
          </button>
          <button
            onClick={() => setUploadType('discount-ad')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              uploadType === 'discount-ad'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/50 scale-105'
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
          className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 mb-12 ${
            dragActive
              ? 'border-blue-500 bg-blue-500/20 scale-105'
              : 'border-slate-600 bg-slate-800/50 hover:border-blue-400 hover:bg-slate-700/50'
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
            <div className="text-6xl mb-4">📤</div>
            <h3 className="text-3xl font-bold text-white mb-2">
              Drag & drop files here
            </h3>
            <p className="text-slate-400 mb-6 text-lg">or click to browse</p>
            <button
              type="button"
              onClick={() => document.getElementById('file-input')?.click()}
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-3 rounded-full font-bold hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Choose Files
            </button>
          </label>
        </div>

        {/* Files Display */}
        {files.length > 0 && (
          <div className="space-y-16">
            {/* Banners Section */}
            {bannerFiles.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-3xl font-bold text-white">🖼️ Banners</h3>
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-lg font-bold">
                    {bannerFiles.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {bannerFiles.map(file => (
                    <div
                      key={file.id}
                      className="group bg-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative w-full h-56 bg-slate-600 overflow-hidden">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <p className="font-semibold text-white truncate mb-2 text-lg">
                          {file.name}
                        </p>
                        <p className="text-sm text-slate-400 mb-4">
                          {formatFileSize(file.size)} • {file.uploadedAt}
                        </p>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-all duration-200"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discount Ads Section */}
            {discountFiles.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-3xl font-bold text-white">🏷️ Discount Ads</h3>
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full text-lg font-bold">
                    {discountFiles.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {discountFiles.map(file => (
                    <div
                      key={file.id}
                      className="group bg-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative w-full h-56 bg-slate-600 overflow-hidden">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <p className="font-semibold text-white truncate mb-2 text-lg">
                          {file.name}
                        </p>
                        <p className="text-sm text-slate-400 mb-4">
                          {formatFileSize(file.size)} • {file.uploadedAt}
                        </p>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-all duration-200"
                        >
                          🗑️ Delete
                        </button>
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
          <div className="text-center py-16 bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-600">
            <p className="text-2xl text-slate-400 mb-2">No content uploaded yet</p>
            <p className="text-slate-500">Start by uploading your first banner or discount ad</p>
          </div>
        )}
      </div>
    </section>
  );
}
