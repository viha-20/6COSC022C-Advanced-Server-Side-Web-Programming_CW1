import axios from 'axios';

const API_URL = 'http://localhost:5000/api/keys';

const generateApiKey = async () => {
  const response = await axios.post(`${API_URL}/generate`, {}, {
    withCredentials: true
  });
  return response.data;
};

const getApiKeyInfo = async () => {
  const response = await axios.get(`${API_URL}/info`, {
    withCredentials: true
  });
  return response.data;
};

export default {
  generateApiKey,
  getApiKeyInfo
};