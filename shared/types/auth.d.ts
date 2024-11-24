﻿declare module "#auth-utils" {

  // This should contain minimal information about the session user
  // More user info should be loaded via from /api/users/me
  interface SessionUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    lastAccess: string | null;
    isAdmin: boolean;
    roles: {
      id: string;
      name: string;
    }[];
  }
}
export {};
