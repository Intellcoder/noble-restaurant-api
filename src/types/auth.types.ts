export interface User {
  userId: string;
  fullname: string;
  email: string;
  isApproved: boolean;
  role: "admin" | "worker" | "rider" | "user";
  phoneNumber: string;
  address: string;
}
export interface LoginDto {
  responseUser: User;
  accessToken: string;
}

export interface CreateUserDto {
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "worker" | "rider" | "user";
  phoneNumber: string;
  address: string;
}
