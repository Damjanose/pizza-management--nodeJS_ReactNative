import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/auth';
import { prisma } from '../utils/prisma';


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

export const login = async (req: Request, res: Response) => {
  try {
    const { name, pass } = req.body;

    if (!name || !pass) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user || user.password !== pass) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};