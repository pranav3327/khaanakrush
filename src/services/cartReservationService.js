import { api } from './api';

export async function createCartReservation(payload) {
  const res = await api.post('/api/cart-reservations', payload);
  return res.data;
}

