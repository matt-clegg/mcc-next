import type { User } from "#auth-utils";

export type Role = {
  id: string;
  name: string;
};

export type UserRole = {
  role: Role;
  user: User;
};
