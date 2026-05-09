import api from "./api";
import type { CreateItemPayload, Item } from "../types/item";

export async function getItems() {
  const response = await api.get("/items");

  return response.data.data as Item[];
}

export async function createItem(payload: CreateItemPayload) {
  const response = await api.post("/items", payload);

  return response.data.data as Item;
}

export async function updateItem(id: number, payload: CreateItemPayload) {
  const response = await api.put(`/items/${id}`, payload);

  return response.data.data as Item;
}

export async function deleteItem(id: number) {
  await api.delete(`/items/${id}`);
}
