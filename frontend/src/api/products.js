import api from './client';

export const createProduct = async (data) => {
  const res = await api.post('/api/products', data);
  return res.data;
};

export const listProducts = async () => {
  const res = await api.get('/api/products');
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await api.put(`/api/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/api/products/${id}`);
  return res.data;
};
