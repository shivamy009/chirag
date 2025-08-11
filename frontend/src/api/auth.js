import api from './client';

export const signup = async ({ name, email, password }) => {
  const { data } = await api.post('/api/auth/signup', { name, email, password });
  return data; // { user, token }
};

export const login = async ({ email, password }) => {
  const { data } = await api.post('/api/auth/login', { email, password });
  return data; // { user, token }
};
