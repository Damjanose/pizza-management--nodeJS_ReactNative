// src/controllers/orderController.ts
import {NextFunction, Request, Response} from 'express';
import {prisma} from '../utils/prisma';
import {CreateOrderRequest, OrderResponse, UpdateOrderRequest} from '../types/order';
import {OrderStatus} from '@prisma/client';

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { tableNumber, ingredientIds }: CreateOrderRequest = req.body;

    if (!tableNumber || !ingredientIds || ingredientIds.length === 0) {
      res.status(400).json({ error: 'Table number and ingredients are required' });
      return;
    }

    const order = await prisma.order.create({
      data: {
        tableNumber,
        ingredients: {
          create: ingredientIds.map((ingredientId) => ({
            ingredientId,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    const response: OrderResponse = {
      id: order.id,
      tableNumber: order.tableNumber,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      ingredients: order.ingredients.map((oi) => ({
        id: oi.ingredient.id,
        name: oi.ingredient.name,
      })),
    };

    // — Emit newOrder event
    const io = req.app.get('io') as import('socket.io').Server;
    io.emit('newOrder', response);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const { tableNumber, ingredientIds }: UpdateOrderRequest = req.body;

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    const existingOrder = await prisma.order.findUnique({ where: { id: orderId } });
    if (!existingOrder) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    if (existingOrder.status !== OrderStatus.WAITING) {
      res.status(400).json({ error: 'Can only update orders with waiting status' });
      return;
    }

    const updateData: any = {};
    if (tableNumber !== undefined) {
      updateData.tableNumber = tableNumber;
    }
    if (ingredientIds) {
      // replace ingredients
      await prisma.orderIngredient.deleteMany({ where: { orderId } });
      updateData.ingredients = {
        create: ingredientIds.map((ingredientId) => ({ ingredientId })),
      };
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    const response: OrderResponse = {
      id: updatedOrder.id,
      tableNumber: updatedOrder.tableNumber,
      status: updatedOrder.status,
      createdAt: updatedOrder.createdAt,
      updatedAt: updatedOrder.updatedAt,
      ingredients: updatedOrder.ingredients.map((oi) => ({
        id: oi.ingredient.id,
        name: oi.ingredient.name,
      })),
    };

    // — Emit orderUpdated event
    const io = req.app.get('io') as import('socket.io').Server;
    io.emit('orderUpdated', response);

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const response: OrderResponse[] = orders.map((order) => ({
      id: order.id,
      tableNumber: order.tableNumber,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      ingredients: order.ingredients.map((oi) => ({
        id: oi.ingredient.id,
        name: oi.ingredient.name,
      })),
    }));

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const confirmOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CONFIRMED },
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    const response: OrderResponse = {
      id: order.id,
      tableNumber: order.tableNumber,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      ingredients: order.ingredients.map((oi) => ({
        id: oi.ingredient.id,
        name: oi.ingredient.name,
      })),
    };

    const io = req.app.get('io') as import('socket.io').Server;
    io.emit('orderConfirmed', response);

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const markOrderReady = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid order ID' });
      return;
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.READY },
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    const response: OrderResponse = {
      id: order.id,
      tableNumber: order.tableNumber,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      ingredients: order.ingredients.map((oi) => ({
        id: oi.ingredient.id,
        name: oi.ingredient.name,
      })),
    };

    // — Emit orderReady event
    const io = req.app.get('io') as import('socket.io').Server;
    io.emit('orderReady', response);

    res.json(response);
  } catch (error) {
    next(error);
  }
};

