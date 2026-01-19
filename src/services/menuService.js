import { api } from './api';

export async function fetchMenuItems() {
  const res = await api.get('/api/menu-items');
  return res.data;
}

