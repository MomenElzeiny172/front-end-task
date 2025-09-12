'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="h-full flex">
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sidebarOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 fixed md:relative w-64 h-full bg-white border-r border-gray-200
        transition-transform duration-200 ease-in-out z-40 flex flex-col
      `}>
              <div className="p-6 border-b border-gray-200">
                  <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                      File Explorer
                  </h1>
              </div>

              <nav className="flex-1 p-4">
                  <Link
                      href="/" 
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${isActive('/') && pathname === '/'
                              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                  >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="font-medium">My Files</span>
                  </Link>

                  <Link
                      href="/recent" 
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/recent')
                              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                  >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Recent Files</span>
                  </Link>
              </nav>

              <div className="p-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                      <div className="mb-1">Storage: In-Memory</div>
                      <div>© 2024 File Explorer</div>
                  </div>
              </div>
          </aside>

          <main className="flex-1 overflow-auto">
              <div className="p-4 md:p-8 pt-16 md:pt-8">
                  <div className="max-w-7xl mx-auto">
                      {children}
                  </div>
              </div>
          </main>
      </div>
  );
}