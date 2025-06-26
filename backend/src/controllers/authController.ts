import { Request, Response } from 'express';
import { LoginRequest, LoginResponse } from '../types/auth';
import { validateCredentials } from '../middlewares/auth';

export const login = (req: Request, res: Response): void => {
  try {
    const { name, pass }: LoginRequest = req.body;

    if (!name || !pass) {
      res.status(400).json({ error: 'Name and password are required' });
      return;
    }

    const role = validateCredentials(name, pass);

    if (!role) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const response: LoginResponse = { role };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};