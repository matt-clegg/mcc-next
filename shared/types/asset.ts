﻿export type Asset = {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  owner: User | null;
  folder: string | null;
  isImage: boolean;
  createdAt: Date;
};
