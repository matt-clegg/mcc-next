export type Role = {
  id: string;
  name: string;
  alias: string;
  isPublic: boolean;
  priority: number;
};

export type UserRole = {
  role: Role;
  user: User; // TODO: Switch actual User type
};
