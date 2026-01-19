import { api } from './api';

export async function createContactMessage(payload) {
  const res = await api.post('/api/contact-messages', payload);
  return res.data;
}

