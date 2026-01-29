import axios from 'axios';

let url = import.meta.env.VITE_API_URL || 'http://localhost:8081';

// Heuristic: If Render injects the internal service name (e.g. "khaanakrush-backend")
// instead of the public URL, we try to construct the public URL.
if (url && !url.includes('.') && !url.includes('localhost') && !url.includes(':')) {
  url = `https://${url}.onrender.com`;
} else if (url && !url.startsWith('http')) {
  url = `https://${url}`;
}

console.log('Configured API_BASE_URL:', url);

export const API_BASE_URL = url;

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

