import { CreateFolderButton } from '@/components/CreateFolderButton';
import { CreateFileButton } from '@/components/CreateFileButton';
import { FolderList } from '@/components/FolderList';
import { root } from '@/lib/data';

export default function Home() {
  const folder = root;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{folder?.name}</h1>
        <p className="text-blue-100">Manage your files and folders</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <CreateFolderButton />
        <CreateFileButton />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {folder && <FolderList nodes={folder.children} />}
      </div>
    </div>
  );
}