export interface User {
  name: string;
  email: string;
  role: string;
  profileImage: string | null;
  phone: string | null;
  userStatus: string;
  isActive: boolean;
  isVerified: boolean;
}
