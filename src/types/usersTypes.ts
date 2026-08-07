export interface UserType {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: {
    name: "CUSTOMER" | "MANAGER" | "ADMIN" | "SUPER_ADMIN";
  };
  isActive: boolean;
  authProvider: string;
}

export const ROLES = {
  CUSTOMER: "CUSTOMER",
  MANAGER: "MANAGER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];

export const ROLE_OPTIONS = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "MANAGER", label: "Manager" },
  { value: "ADMIN", label: "Admin" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
];