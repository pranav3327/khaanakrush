import { api } from './api';

export async function placeOrder(payload) {
  const res = await api.post('/api/orders', payload);
  return res.data;
}

