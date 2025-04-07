import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    withCredentials: true
  });
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, {
    withCredentials: true
  });
  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true
  });
  return response.data;
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};