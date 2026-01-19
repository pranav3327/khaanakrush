import { api } from './api';

export async function createEventBooking(payload) {
  const res = await api.post('/api/event-bookings', payload);
  return res.data;
}

