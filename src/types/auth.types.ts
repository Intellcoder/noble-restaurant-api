export interface User {
  userId: string;
  fullname: string;
  email: string;
  passwordHash: string;
  accessToken: string;
  refreshToken: string;
  resetPasswordToken: string;
  resetTokenExpiresAt: Date | null;
}
