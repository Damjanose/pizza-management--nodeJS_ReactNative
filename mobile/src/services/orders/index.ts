import APIClient from "../client/APIClient";

export const OrdersService = {
  getAllOrders() {
    return APIClient().get("/orders");
  },
  createNewOrder(data: NewOrderPayload) {
    return APIClient().post("/orders", data);
  },
  editOrder(id: number, payload: NewOrderPayload) {
    return APIClient().put(`/orders/${id}`, payload);
  },
  confirmOrder(id: number) {
    return APIClient().patch(`/orders/${id}/confirm`);
  },
  readyOrder(id: number) {
    return APIClient().patch(`/orders/${id}/ready`);
  },
  newIngredients(name: string) {
    return APIClient().post("/ingredients", name);
  },
  getAllIngredients() {
    return APIClient().post("/ingredients");
  },
};

interface NewOrderPayload {
  tableNumber: number;
  ingredientIds: Array<number>;
}
