import { OrderStatus } from '@prisma/client';

export interface CreateOrderRequest {
  tableNumber: number;
  ingredientIds: number[];
}

export interface UpdateOrderRequest {
  tableNumber?: number;
  ingredientIds?: number[];
}

export interface OrderResponse {
  id: number;
  tableNumber: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  ingredients: {
    id: number;
    name: string;
  }[];
}