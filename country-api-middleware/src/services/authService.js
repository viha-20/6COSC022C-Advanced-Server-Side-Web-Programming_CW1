const jwt = require('jsonwebtoken');
const ApiKey = require('../models/ApiKey');
const { generateApiKey } = require('../utils/helpers');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createApiKeyForUser = async (userId) => {
  try {
    // Find existing API key record for this user
    let apiKeyRecord = await ApiKey.findOne({ 
      where: { userId }
    });

    // If no record exists, create a new one
    if (!apiKeyRecord) {
      apiKeyRecord = await ApiKey.create({
        userId,
        isActive: true
      });
    }

    // Generate new key value
    const newKeyValue = generateApiKey();

    // Update the existing record with new key
    await apiKeyRecord.update({
      key: newKeyValue,
      isActive: true,
      lastUsed: null,
      usageCount: 0
    });

    return newKeyValue;
  } catch (error) {
    console.error('Error creating API key:', error);
    throw error;
  }
};

const revokeApiKeyForUser = async (userId) => {
  try {
    // Find the API key record
    const apiKeyRecord = await ApiKey.findOne({ 
      where: { userId }
    });

    if (apiKeyRecord) {
      // Only nullify the key value, keep the record
      await apiKeyRecord.update({
        key: null,
        isActive: false
      });
    }

    return true;
  } catch (error) {
    console.error('Error revoking API key:', error);
    return false;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  createApiKeyForUser,
  revokeApiKeyForUser,
  verifyToken
};
