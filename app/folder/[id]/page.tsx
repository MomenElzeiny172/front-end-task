import { findFolder, root, FolderNode } from '@/lib/data';
import { CreateFolderButton } from '@/components/CreateFolderButton';
import { CreateFileButton } from '@/components/CreateFileButton';
import BackButton from '@/components/BackButton';
import { FolderList } from '@/components/FolderList';

interface Props {
  params: { id: string };
}

function findParentFolder(targetId: string): { id: string; name: string } | null {
  if (targetId === 'root') return null;

  if (root.children.some(child => child.id === targetId)) {
    return { id: 'root', name: 'My Files' };
  }

  function searchTree(folder: FolderNode): { id: string; name: string } | null {
    for (const child of folder.children) {
      if (child.id === targetId) {
        return { id: folder.id, name: folder.name };
      }

      if (child.type === 'folder') {
        const result = searchTree(child as FolderNode);
        if (result) return result;
      }
    }

    return null;
  }

  return searchTree(root);
}

export default function FolderPage({ params }: Props) {
  const folder = findFolder(params.id);
  if (!folder) {
    return (
      <div className="text-center py-12">
        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <p className="text-gray-500 text-xl">Folder not found</p>
      </div>
    );
  }

  const parent = findParentFolder(params.id);

  return (
    <div className="space-y-6">
      {parent && (
        <BackButton
          parentId={parent.id}
          parentName={parent.name === 'root' ? 'My Files' : parent.name}
        />
      )}

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{folder.name}</h1>
        <p className="text-blue-100">
          {folder.children.length} {folder.children.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <CreateFolderButton />
        <CreateFileButton />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <FolderList nodes={folder.children} />
      </div>
    </div>
  );
}