import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

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