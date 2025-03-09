const CountryService = require('../services/countryService');

const getCountryData = async (req, res) => {
  try {
    const apiKey = req.header('X-API-Key');
    const data = await CountryService.getCountryData(apiKey);
    res.json(data);
  } catch (err) {
    console.error('Error in getCountryData:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const getCountryByName = async (req, res) => {
  try {
    const apiKey = req.header('X-API-Key');
    const countryName = req.params.name;
    const data = await CountryService.getCountryByName(apiKey, countryName);
    res.json(data);
  } catch (err) {
    console.error('Error in getCountryByName:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCountryData, getCountryByName };