import { root, FolderNode, FileNode } from '@/lib/data';
import FileIcon from '@/components/FileIcon';
import Link from 'next/link';

interface FileWithPath {
  file: FileNode;
  parentId: string;
  parentName: string;
  path: string[];
}

function getAllFiles(): FileWithPath[] {
  const files: FileWithPath[] = [];

  function traverse(folder: FolderNode, path: string[] = []) {
    const currentPath = folder.id === 'root' ? [] : [...path, folder.name];

    for (const child of folder.children) {
      if (child.type === 'file') {
        files.push({
          file: child,
          parentId: folder.id,
          parentName: folder.name === 'root' ? 'My Files' : folder.name,
          path: currentPath
        });
      } else if (child.type === 'folder') {
        traverse(child as FolderNode, currentPath);
      }
    }
  }

  traverse(root);

  return files.sort((a, b) => {
    const aId = parseInt(a.file.id) || 0;
    const bId = parseInt(b.file.id) || 0;
    return bId - aId;
  });
}

export default function RecentPage() {
  const allFiles = getAllFiles();
  const recentFiles = allFiles.slice(0, 20);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recent Files</h1>
        <p className="text-gray-600 mt-1">Your recently added files</p>
      </div>

      {recentFiles.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 text-lg">No files uploaded yet</p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to My Files
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="grid gap-px bg-gray-200">
            {recentFiles.map((item, index) => (
              <Link
                key={`${item.file.id}-${index}`}
                href={`/folder/${item.parentId}`}
                className="bg-white p-4 hover:bg-gray-50 transition-colors flex items-center gap-4"
              >
                <FileIcon fileName={item.file.name} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {item.file.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {item.path.length > 0 ? (
                      <>in {item.path.join(' / ')}</>
                    ) : (
                      <>in My Files</>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  #{index + 1}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {recentFiles.length > 0 && (
        <p className="text-sm text-gray-500 text-center">
          Showing {recentFiles.length} most recent files
        </p>
      )}
    </div>
  );
}