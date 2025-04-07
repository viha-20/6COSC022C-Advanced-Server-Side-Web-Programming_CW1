import axios from 'axios';

const API_URL = 'http://localhost:5000/api/countries';

const getAllCountries = async (apiKey) => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      'x-api-key': apiKey
    }
  });
  return response.data;
};

const getCountryByName = async (name, apiKey) => {
  const response = await axios.get(`${API_URL}/${name}`, {
    headers: {
      'x-api-key': apiKey
    }
  });
  return response.data;
};

export default {
  getAllCountries,
  getCountryByName
};