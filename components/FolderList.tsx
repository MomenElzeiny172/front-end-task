'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { FolderNode, FileNode } from '@/lib/data';
import FileIcon from './FileIcon';
import FolderIcon from './FolderIcon';
import SearchBar from './SearchBar';

export function FolderList({ nodes }: { nodes: Array<FolderNode | FileNode> }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) {
      return nodes;
    }

    const query = searchQuery.toLowerCase().trim();
    return nodes.filter(node =>
      node.name.toLowerCase().includes(query)
    );
  }, [nodes, searchQuery]);

  const renderContent = () => {
    if (!nodes.length) {
      return <p className="text-gray-500">(empty)</p>;
    }

    if (searchQuery && !filteredNodes.length) {
      return (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-500">No results found for "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-2 text-blue-500 hover:text-blue-600"
          >
            Clear search
          </button>
        </div>
      );
    }

    return (
      <ul className="flex flex-col gap-2">
        {filteredNodes.map((node) => {
          if (node.type === 'folder') {
            return (
              <li key={node.id}>
                <Link
                  href={`/folder/${node.id}`}
                  className="flex items-center gap-3 border p-3 rounded-lg bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <FolderIcon />
                  <span className="font-medium">
                    {searchQuery ? highlightMatch(node.name, searchQuery) : node.name}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={node.id}>
              <div className="flex items-center gap-3 border p-3 rounded-lg bg-white">
                <FileIcon fileName={node.name} />
                <div className="flex-1">
                  <span className="text-gray-800">
                    {searchQuery ? highlightMatch(node.name, searchQuery) : node.name}
                  </span>
                  {node.name.endsWith('.png') && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">IMAGE</span>
                  )}
                  {node.name.endsWith('.mp4') && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded">VIDEO</span>
                  )}
                  {node.name.endsWith('.pdf') && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">PDF</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="space-y-4">
      {nodes.length > 0 && (
        <SearchBar onSearch={setSearchQuery} />
      )}

      {searchQuery && filteredNodes.length > 0 && (
        <p className="text-sm text-gray-600">
          Found {filteredNodes.length} {filteredNodes.length === 1 ? 'item' : 'items'}
        </p>
      )}

      {renderContent()}
    </div>
  );
}

function highlightMatch(text: string, query: string): JSX.Element {
  if (!query) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-yellow-200 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}