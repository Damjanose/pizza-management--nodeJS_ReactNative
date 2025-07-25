import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tableNumber, ingredientIds } = req.body;

    if (!tableNumber) {
      res.status(400).json({ error: 'Table number is required' });
      return;
    }

    // Check for ongoing order for this table
    const ongoingOrder = await prisma.order.findFirst({
      where: {
        tableNumber,
        status: { in: ['WAITING', 'COOKING'] },
      },
    });
    if (ongoingOrder) {
      res.status(400).json({ error: 'This table already has an ongoing order.' });
      return;
    }

    // 1. Create the order
    const order = await prisma.order.create({
      data: {
        tableNumber,
        status: 'WAITING',
      },
    });

    // 2. Create the join records
    if (ingredientIds && ingredientIds.length > 0) {
      // @ts-ignore
      await (prisma as any).orderIngredient.createMany({
        data: ingredientIds.map((ingredientId: number) => ({
          orderId: order.id,
          ingredientId,
        })),
      });
    }

    // 3. Fetch the order with its ingredients
    // @ts-ignore
    const orderIngredients = await (prisma as any).orderIngredient.findMany({
      where: { orderId: order.id },
      include: { ingredient: true },
    });

    res.status(201).json({
      ...order,
      ingredients: Array.isArray(orderIngredients)
        ? orderIngredients.map((oi: any) => oi.ingredient)
        : [],
    });
  } catch (error) {
    // If error is a known Prisma error, return a clear message
    if (error instanceof Error && error.message.includes('This table already has an ongoing order.')) {
      res.status(400).json({ error: 'This table already has an ongoing order.' });
      return;
    }
    next(error);
  }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id);
    const { tableNumber, status, ingredientIds } = req.body;

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const updateData: any = {};
    if (tableNumber !== undefined) updateData.tableNumber = tableNumber;
    if (status !== undefined) updateData.status = status;

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    // If ingredientIds are provided, update the join table
    if (ingredientIds) {
      // Remove existing ingredients
      await prisma.orderIngredient.deleteMany({ where: { orderId } });
      // Add new ingredients
      if (ingredientIds.length > 0) {
        await prisma.orderIngredient.createMany({
          data: ingredientIds.map((ingredientId: number) => ({
            orderId,
            ingredientId,
          })),
        });
      }
    }

    // Fetch the order with its ingredients
    // @ts-ignore
    const orderIngredients = await (prisma as any).orderIngredient.findMany({
      where: { orderId },
      include: { ingredient: true },
    });

    res.json({
      ...updatedOrder,
      ingredients: Array.isArray(orderIngredients)
        ? orderIngredients.map((oi: any) => oi.ingredient)
        : [],
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    // For each order, fetch its ingredients
    const ordersWithIngredients = await Promise.all(
      orders.map(async (order) => {
        // @ts-ignore
        const orderIngredients = await (prisma as any).orderIngredient.findMany({
          where: { orderId: order.id },
          include: { ingredient: true },
        });
        return {
          ...order,
          ingredients: Array.isArray(orderIngredients)
            ? orderIngredients.map((oi: any) => oi.ingredient)
            : [],
        };
      })
    );
    res.json(ordersWithIngredients);
  } catch (error) {
    next(error);
  }
};

export const confirmOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id);

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CONFIRMED' },
    });

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const markOrderReady = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id);

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'READY' },
    });

    res.json(order);
  } catch (error) {
    next(error);
  }
};