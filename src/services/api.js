import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
});

export function getApiErrorMessage(err) {
  if (!err) return 'Something went wrong.';
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    'Something went wrong.';
  return String(msg);
}

