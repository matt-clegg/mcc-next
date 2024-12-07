export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  lastAccess: string;
  isAdmin: boolean;
  isJunior: boolean;
  isVerified: boolean;
  parent?: string;
  createdAt: string;
  updatedAt: string;
  roles?: string[];
};

export type MedicalInfo = {
  allergies: boolean;
  asthma: boolean;
  diabetes: boolean;
  epilepsy: boolean;
  other: boolean;
  details: string | null;
};
