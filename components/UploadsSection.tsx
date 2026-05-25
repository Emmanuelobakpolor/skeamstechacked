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
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Content Management
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Upload and manage your banners, discount ads, and promotional content
          </p>
        </div>

        {/* Upload Type Tabs */}
        <div className="flex gap-3 mb-12 justify-center flex-wrap">
          <button
            onClick={() => setUploadType('banner')}
            className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 ${
              uploadType === 'banner'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Banners
          </button>
          <button
            onClick={() => setUploadType('discount-ad')}
            className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 ${
              uploadType === 'discount-ad'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Discount Ads
          </button>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors duration-200 mb-12 ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-blue-400'
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Drag & drop files here
            </h3>
            <p className="text-gray-500 mb-6">or click to browse</p>
            <button
              type="button"
              onClick={() => document.getElementById('file-input')?.click()}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
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
                  <h3 className="text-2xl font-semibold text-gray-900">Banners</h3>
                  <span className="bg-blue-600 text-white px-3 py-0.5 rounded-full text-sm font-medium">
                    {bannerFiles.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bannerFiles.map(file => (
                    <div
                      key={file.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-medium text-gray-900 truncate mb-1">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {formatFileSize(file.size)} • {file.uploadedAt}
                        </p>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                          Delete
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
                  <h3 className="text-2xl font-semibold text-gray-900">Discount Ads</h3>
                  <span className="bg-blue-600 text-white px-3 py-0.5 rounded-full text-sm font-medium">
                    {discountFiles.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {discountFiles.map(file => (
                    <div
                      key={file.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-medium text-gray-900 truncate mb-1">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {formatFileSize(file.size)} • {file.uploadedAt}
                        </p>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                          Delete
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
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-lg text-gray-500 mb-2">No content uploaded yet</p>
            <p className="text-gray-400">Start by uploading your first banner or discount ad</p>
          </div>
        )}
      </div>
    </section>
  );
}
