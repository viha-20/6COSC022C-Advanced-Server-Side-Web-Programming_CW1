const axios = require('axios');
const ApiKey = require('../models/ApiKey');

class CountryService {
  static async getCountryData(apiKey) {
    console.log(`Fetching country data for API key: ${apiKey}`);
    const keyRecord = await ApiKey.findByKey(apiKey);
    if (!keyRecord) throw new Error('Invalid API key');

    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      console.log('Country data fetched successfully');
      return response.data.map(country => ({
        name: country.name.common,
        currency: Object.keys(country.currencies || {}),
        capital: country.capital?.[0],
        languages: Object.values(country.languages || {}),
        flag: country.flags.png
      }));
    } catch (err) {
      console.error('Error fetching country data:', err.message);
      throw new Error('Failed to fetch country data from external API');
    }
  }

  static async getCountryByName(apiKey, countryName) {
    console.log(`Fetching country data for: ${countryName}`);
    const keyRecord = await ApiKey.findByKey(apiKey);
    if (!keyRecord) throw new Error('Invalid API key');

    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      if (!response.data || response.data.length === 0) {
        throw new Error('Country not found');
      }
      const country = response.data[0];
      console.log(`Country data fetched successfully: ${countryName}`);
      return {
        name: country.name.common,
        currency: Object.keys(country.currencies || {}),
        capital: country.capital?.[0],
        languages: Object.values(country.languages || {}),
        flag: country.flags.png
      };
    } catch (err) {
      console.error('Error fetching country data:', err.message);
      throw new Error('Failed to fetch country data from external API');
    }
  }
}

module.exports = CountryService;