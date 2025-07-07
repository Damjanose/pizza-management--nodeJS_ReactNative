import { create } from "zustand";
import { OrdersService } from "../services/orders";

export interface Ingredient {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  tableNumber: number;
  status: "WAITING" | "READY" | "CONFIRMED";
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
}

interface OrdersState {
  orders: Order[];
  ingredients: Ingredient[];
  loading: boolean;
  error: string | null;

  fetchOrders: () => Promise<void>;
  fetchIngredients: () => Promise<void>;
  createOrder: (tableNumber: number, ingredientIds: number[]) => Promise<void>;
  editOrder: (
    id: number,
    tableNumber: number,
    ingredientIds: number[]
  ) => Promise<void>;
  confirmOrder: (id: number) => Promise<void>;
  readyOrder: (id: number) => Promise<void>;
  addIngredient: (name: string) => Promise<void>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  ingredients: [],
  loading: false,
  error: null,

  fetchOrders: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await OrdersService.getAllOrders();
      set({ orders: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.message ?? "Failed to fetch orders", loading: false });
    }
  },

  fetchIngredients: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await OrdersService.getAllIngredients();
      set({ ingredients: response.data, loading: false });
    } catch (err: any) {
      set({
        error: err.message ?? "Failed to fetch ingredients",
        loading: false,
      });
    }
  },

  createOrder: async (
    tableNumber: number,
    ingredientIds: number[]
  ): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const payload = { tableNumber, ingredientIds };
      const response = await OrdersService.createNewOrder(payload);
      set((state) => ({
        orders: [...state.orders, response.data],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message ?? "Failed to create order", loading: false });
    }
  },

  editOrder: async (
    id: number,
    tableNumber: number,
    ingredientIds: number[]
  ): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const payload = { tableNumber, ingredientIds };
      const response = await OrdersService.editOrder(id, payload);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? response.data : o)),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message ?? "Failed to edit order", loading: false });
    }
  },

  confirmOrder: async (id: number): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await OrdersService.confirmOrder(id);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? response.data : o)),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message ?? "Failed to confirm order", loading: false });
    }
  },

  readyOrder: async (id: number): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await OrdersService.readyOrder(id);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? response.data : o)),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message ?? "Failed to mark ready", loading: false });
    }
  },

  addIngredient: async (name: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await OrdersService.newIngredients(name);
      set((state) => ({
        ingredients: [...state.ingredients, response.data],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message ?? "Failed to add ingredient", loading: false });
    }
  },
}));
