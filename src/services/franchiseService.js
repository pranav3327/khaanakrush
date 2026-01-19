import { api } from './api';

export async function createFranchiseApplication(payload) {
  const res = await api.post('/api/franchise-applications', payload);
  return res.data;
}

