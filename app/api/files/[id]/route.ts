import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { findFolder, root, FolderNode } from "@/lib/data";
import { writeFile, mkdir } from 'fs/promises';
import { join, basename } from 'path';

export const runtime = 'nodejs';

function getFolderPath(folderId: string): string {
  if (folderId === "root") {
    return "";
  }

  const pathParts: string[] = [];

  function findPath(targetId: string): boolean {
    if (targetId === "root") {
      return true;
    }

    function searchTree(folder: FolderNode, currentPath: string[]): boolean {
      for (const child of folder.children) {
        if (child.id === targetId) {
          if (folder.id !== "root") {
            pathParts.unshift(...currentPath, folder.name);
          } else {
            pathParts.unshift(...currentPath);
          }
          return true;
        }

        if (child.type === "folder") {
          const newPath =
            folder.id === "root" ? [] : [...currentPath, folder.name];
          if (searchTree(child as FolderNode, newPath)) {
            return true;
          }
        }
      }
      return false;
    }

    return searchTree(root, []);
  }

  const folder = findFolder(folderId);
  if (!folder) {
    return "";
  }

  findPath(folderId);
  pathParts.push(folder.name);

  return pathParts.join("/");
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const providedName = formData.get("name")?.toString();
  const parent = findFolder(params.id);

  if (!parent || !file) {
    return NextResponse.json(
      { error: "Invalid request: missing parent or file" },
      { status: 400 }
    );
  }

  const rawName =
    providedName && providedName.trim() ? providedName.trim() : file.name;
  const safeName = basename(rawName);

  if (!safeName) {
    return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
  }

  const folderPath = getFolderPath(params.id);
  const publicDir = join(process.cwd(), "public", "files");
  const targetDir = folderPath ? join(publicDir, folderPath) : publicDir;
  const filePath = join(targetDir, safeName);

  try {
    await mkdir(targetDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes), { flag: "wx" });
  } catch (err: any) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as any).code === "EEXIST"
    ) {
      return NextResponse.json(
        { error: `File "${safeName}" already exists in this folder` },
        { status: 409 }
      );
    }
    console.error("Failed to create file:", err);
    return NextResponse.json(
      { error: "Failed to create file" },
      { status: 500 }
    );
  }

  parent.children.push({
    id: Date.now().toString(),
    name: safeName,
    type: "file",
    path: join("files", folderPath, safeName).replace(/\\/g, "/"),
  });

  revalidatePath("/");
  revalidatePath(`/folder/${params.id}`);

  return NextResponse.json({ success: true });
}