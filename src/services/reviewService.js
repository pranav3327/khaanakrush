import { api } from './api';

export async function createReview(payload) {
  const res = await api.post('/api/reviews', payload);
  return res.data;
}

