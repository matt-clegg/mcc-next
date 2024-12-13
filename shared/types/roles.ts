export type RoleType = "public" | "administrative";
export type RoleVisibility = "public" | "internal";

export type Role = {
  id: string;
  name: string;
  description: string | null;
  alias: string;
  type: RoleType;
  visibility: RoleVisibility;
  priority: number;
};

export type UserRole = {
  role: Role;
  user: User;
};
