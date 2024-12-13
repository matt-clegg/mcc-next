import type { Role } from "#shared/types/roles";

export type Folder = {
  id: string;
  path: string;
  name: string;
  parent: string | null;
  permissions: FolderPermission[] | null;
  createdAt: string;
};

export type FolderPermission = {
  id: string;
  folder: string;
  user: { id: string } | null;
  role: Role | null;
  createdAt: string;
};
