export type FileNode = {
  id: string;
  name: string;
  type: "file";
  path?: string;
};

export type FolderNode = {
  id: string;
  name: string;
  type: "folder";
  children: Array<FolderNode | FileNode>;
};

declare global {
  var fileSystemRoot: FolderNode | undefined;
}

if (!global.fileSystemRoot) {
  global.fileSystemRoot = {
    id: "root",
    name: "My Files",
    type: "folder",
    children: [
      { id: "folder-1", name: "Documents", type: "folder", children: [] },
      { id: "folder-2", name: "Images", type: "folder", children: [] },
    ],
  };
}

export const root: FolderNode = global.fileSystemRoot;

export function findFolder(
  id: string | undefined,
  current: FolderNode = root
): FolderNode | null {
  if (!id || id === "root") return root;

  if (current.id === id) return current;

  for (const child of current.children) {
    if (child.type === "folder") {
      const result = findFolder(id, child);
      if (result) return result;
    }
  }

  return null;
}