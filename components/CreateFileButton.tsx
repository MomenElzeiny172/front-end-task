'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export function CreateFileButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const currentFolderId = params?.id as string || 'root';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      if (name.trim()) {
        formData.append('name', name.trim());
      }

      const response = await fetch(`/api/files/${currentFolderId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.refresh();
        setOpen(false);
        setName('');
        setFile(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setFile(null);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        Upload File
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload File</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select File
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Name (optional)
              </label>
              <input
                type="text"
                placeholder="Leave empty to use original filename"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {file && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-4">
                <div className="font-medium text-gray-700">Selected File:</div>
                <div className="mt-1">{file.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Size: {(file.size / 1024).toFixed(1)} KB
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || !file}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}