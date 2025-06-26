export type UserRole = 'waiter' | 'cooker';

export interface LoginRequest {
  name: string;
  pass: string;
}

export interface LoginResponse {
  role: UserRole;
}

export interface AuthenticatedRequest extends Express.Request {
  userRole?: UserRole;
}