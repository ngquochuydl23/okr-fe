export type UserRole = "admin" | "manager" | "user";

export interface LoggingInUserDto {
  id: string;
  fullName: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  roles: UserRole[];
}