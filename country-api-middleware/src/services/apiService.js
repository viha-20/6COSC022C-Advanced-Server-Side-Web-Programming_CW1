const axios = require('axios');
const ApiKey = require('../models/ApiKey');
const UsageLog = require('../models/UsageLog');

const BASE_URL = 'https://restcountries.com/v3.1';

const fetchAllCountries = async () => {
  try {
    // Set a longer timeout (30 seconds) and proper headers
    const response = await axios.get(`${BASE_URL}/all`, {
      timeout: 30000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format from API');
    }

    // Process each country to extract required fields
    return response.data.map(country => {
      // Handle cases where fields might be missing
      const currencies = country.currencies ? Object.keys(country.currencies) : [];
      const capital = country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';
      const languages = country.languages ? Object.values(country.languages) : [];
      const flag = country.flags?.png || country.flags?.svg || '';

      return {
        name: country.name?.common || 'Unknown',
        officialName: country.name?.official || '',
        currencies,
        capital,
        languages,
        flag,
        region: country.region || '',
        subregion: country.subregion || '',
        population: country.population || 0,
        timezones: country.timezones || []
      };
    });
  } catch (error) {
    console.error('Error fetching all countries:', error.message);
    throw new Error(`Failed to fetch countries: ${error.message}`);
  }
};








const fetchCountryByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    const country = response.data[0];
    
    // Handle cases where fields might be missing
    const currencies = country.currencies ? Object.keys(country.currencies) : [];
    const capital = country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';
    const languages = country.languages ? Object.values(country.languages) : [];
    const flag = country.flags?.png || country.flags?.svg || '';

    return {
      name: country.name?.common || 'Unknown',
      currencies,
      capital,
      languages,
      flag
    };
  } catch (error) {
    console.error(`Error fetching country ${name}:`, error.message);
    throw new Error(`Failed to fetch country ${name} from external API`);
  }
};

const logApiUsage = async (apiKeyId, endpoint, ipAddress) => {
  try {
    // Update the API key usage count and last used timestamp
    const apiKey = await ApiKey.findByPk(apiKeyId);
    if (apiKey) {
      apiKey.usageCount += 1;
      apiKey.lastUsed = new Date();
      await apiKey.save();
    }
    
    // Create a usage log entry
    await UsageLog.create({
      apiKeyId,
      endpoint,
      ipAddress
    });
  } catch (error) {
    console.error('Error logging API usage:', error);
  }
};

module.exports = {
  fetchAllCountries,
  fetchCountryByName,
  logApiUsage
};