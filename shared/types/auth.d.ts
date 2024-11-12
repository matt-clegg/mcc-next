declare module "#auth-utils" {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    lastAccess: string | null;
    isAdmin: boolean;
    isJunior: boolean;
    parent: string | null;
    createdAt: string;
    updatedAt: string;
    roles: {
      id: string;
      name: string;
    }[];
  }
}
export {};
