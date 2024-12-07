export type NewsStatus = "published" | "draft" | "scheduled";

export type News = {
  title: string;
  slug: string;
  content: string;
  status: NewsStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};
