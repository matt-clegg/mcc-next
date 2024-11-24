import type { SessionUser } from "#auth-utils";

export type Role = {
  id: string;
  name: string;
};

export type UserRole = {
  role: Role;
  user: SessionUser; // TODO: Switch actual User type
};
