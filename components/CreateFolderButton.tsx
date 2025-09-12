'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export function CreateFolderButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const params = useParams();
  const currentFolderId = params?.id as string || 'root';

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Folder
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const trimmed = name.trim();
              if (trimmed) {
                setIsCreating(true);
                await fetch(`/api/folders/${currentFolderId}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: trimmed }),
                });
                router.refresh();
                setIsCreating(false);
              }
              setOpen(false);
              setName('');
            }}
          >
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Create New Folder</h3>

              <input
                autoFocus
                placeholder="Folder name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isCreating}
              />

              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setName('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  disabled={!name.trim() || isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}