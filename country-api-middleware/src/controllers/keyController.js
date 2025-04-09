const { createApiKeyForUser } = require('../services/authService');
const ApiKey = require('../models/ApiKey');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const generateNewApiKey = async (req, res) => {
  try {
    const apiKey = await createApiKeyForUser(req.user.id);
    successResponse(res, { apiKey }, 'New API key generated');
  } catch (error) {
    console.error('Error generating new API key:', error);
    errorResponse(res, 'Failed to generate new API key', 500);
  }
};

const getApiKeyInfo = async (req, res) => {
  try {
    const apiKey = await ApiKey.findOne({
      where: { userId: req.user.id },
      attributes: ['key', 'lastUsed', 'usageCount', 'createdAt']
    });
    
    if (!apiKey || !apiKey.key) {
      return errorResponse(res, 'No active API key. Please generate one.', 404);
    }
    
    successResponse(res, { apiKey }, 'API key information retrieved');
  } catch (error) {
    console.error('Error getting API key info:', error);
    errorResponse(res, 'Failed to get API key information', 500);
  }
};

module.exports = {
  generateNewApiKey,
  getApiKeyInfo
};