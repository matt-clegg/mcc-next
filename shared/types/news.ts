export type NewsPost = {
  title: string;
  slug: string;
  content: string;
  status: "published" | "draft" | "scheduled";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};
