import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';

export const getAllIngredients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

export const createIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.status(400).json({ error: 'Ingredient name is required' });
      return;
    }

    const ingredient = await prisma.ingredient.create({
      data: {
        name: name.trim(),
      },
    });

    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
};