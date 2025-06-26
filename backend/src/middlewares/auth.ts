import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/auth';

// Static user credentials
const USERS = {
  waiter: { name: 'waiter', pass: 'waiter', role: 'waiter' as UserRole },
  cook: { name: 'cook', pass: 'cook', role: 'cooker' as UserRole },
};

export const validateRole = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers['x-role'] as UserRole;

  if (!role) {
    return res.status(401).json({ error: 'Missing x-role header' });
  }

  if (role !== 'waiter' && role !== 'cooker') {
    return res.status(401).json({ error: 'Invalid role' });
  }

  (req as any).userRole = role;
  next();
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).userRole as UserRole;

    if (!userRole) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

export const validateCredentials = (name: string, pass: string): UserRole | null => {
  const user = Object.values(USERS).find(u => u.name === name && u.pass === pass);
  return user ? user.role : null;
};