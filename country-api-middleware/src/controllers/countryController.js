// const { fetchAllCountries, fetchCountryByName, logApiUsage } = require('../services/apiService');
// const { successResponse, errorResponse } = require('../utils/apiResponse');

// const getAllCountries = async (req, res) => {
//   try {
//     console.log('Starting getAllCountries request');
//     await logApiUsage(req.apiKey.id, '/countries', req.ip);

//     const countries = await fetchAllCountries();
    
//     if (!countries || countries.length === 0) {
//       console.warn('No countries received from external API');
//       return errorResponse(res, 'No countries found', 404);
//     }
    
//     console.log(`Successfully retrieved ${countries.length} countries`);
//     successResponse(res, { 
//       countries,
//       count: countries.length 
//     }, 'Countries retrieved successfully');
//   } catch (error) {
//     console.error('Error in getAllCountries:', error.message);
//     errorResponse(res, error.message, 500);
//   }
// };




const { fetchAllCountries, fetchCountryByName, logApiUsage } = require('../services/apiService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getAllCountries = async (req, res) => {
  try {
    // Log API usage
    await logApiUsage(req.apiKey.id, '/countries', req.ip);

    // Fetch all countries with timeout handling
    const countries = await Promise.race([
      fetchAllCountries(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 25000)
      )
    ]);

    // Check if we got any countries
    if (!countries || countries.length === 0) {
      return errorResponse(res, 'No countries found', 404);
    }
    
    successResponse(res, { 
      countries,
      count: countries.length 
    }, 'Countries retrieved successfully');
  } catch (error) {
    console.error('Error in getAllCountries:', error.message);
    errorResponse(res, `Failed to fetch countries: ${error.message}`, 500);
  }
};

// ... keep getCountryByName the same





const getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;

    // Log API usage
    await logApiUsage(req.apiKey.id, `/countries/${name}`, req.ip);

    // Fetch country by name
    const country = await fetchCountryByName(name);
    
    if (!country) {
      return errorResponse(res, `Country ${name} not found`, 404);
    }
    
    successResponse(res, { country }, 'Country retrieved successfully');
  } catch (error) {
    console.error(`Error getting country by name ${req.params.name}:`, error.message);
    errorResponse(res, error.message || 'Failed to retrieve country', 500);
  }
};

module.exports = {
  getAllCountries,
  getCountryByName
};