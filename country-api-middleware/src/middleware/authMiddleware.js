// const jwt = require('jsonwebtoken');
// const ApiKey = require('../models/ApiKey');
// const { errorResponse } = require('../utils/apiResponse');
// const { verifyToken } = require('../services/authService');

// const protect = async (req, res, next) => {
//   let token;
  
//   if (req.cookies.token) {
//     token = req.cookies.token;
//   } else if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }
  
//   if (!token) {
//     return errorResponse(res, 'Not authorized, no token', 401);
//   }
  
//   try {
//     const decoded = verifyToken(token);
//     if (!decoded) {
//       return errorResponse(res, 'Not authorized, token expired or invalid', 401);
//     }
//     req.user = { id: decoded.id };
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return errorResponse(res, 'Not authorized, token failed', 401);
//   }
// };

// // const apiKeyAuth = async (req, res, next) => {
// //   const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
// //   if (!apiKey) {
// //     return errorResponse(res, 'API key required', 401);
// //   }
  
// //   try {
// //     const keyRecord = await ApiKey.findOne({ 
// //       where: { 
// //         key: apiKey,
// //         isActive: true 
// //       } 
// //     });
    
// //     if (!keyRecord) {
// //       return errorResponse(res, 'Invalid or revoked API key', 401);
// //     }
    
// //     req.apiKey = keyRecord;
// //     next();
// //   } catch (error) {
// //     console.error('API key verification error:', error);
// //     return errorResponse(res, 'API key verification failed', 500);
// //   }
// // };




// const apiKeyAuth = async (req, res, next) => {
//   const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
//   if (!apiKey) {
//     return errorResponse(res, 'API key required', 401);
//   }
  
//   try {
//     const keyRecord = await ApiKey.findOne({ 
//       where: { 
//         key: apiKey // Only check for non-null keys
//       } 
//     });
    
//     if (!keyRecord) {
//       return errorResponse(res, 'Invalid API key', 401);
//     }
    
//     req.apiKey = keyRecord;
//     next();
//   } catch (error) {
//     console.error('API key verification error:', error);
//     return errorResponse(res, 'API key verification failed', 500);
//   }
// };

// module.exports = {
//   protect,
//   apiKeyAuth
// };




const jwt = require('jsonwebtoken');
const ApiKey = require('../models/ApiKey');
const { errorResponse } = require('../utils/apiResponse');
const { verifyToken } = require('../services/authService');

const protect = async (req, res, next) => {
  let token;
  
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return errorResponse(res, 'Not authorized, no token', 401);
  }
  
  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return errorResponse(res, 'Not authorized, token expired or invalid', 401);
    }
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return errorResponse(res, 'Not authorized, token failed', 401);
  }
};

const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey) {
    return errorResponse(res, 'API key required', 401);
  }
  
  try {
    const keyRecord = await ApiKey.findOne({ 
      where: { 
        key: apiKey,
        isActive: true 
      } 
    });
    
    if (!keyRecord) {
      return errorResponse(res, 'Invalid or revoked API key', 401);
    }
    
    req.apiKey = keyRecord;
    next();
  } catch (error) {
    console.error('API key verification error:', error);
    return errorResponse(res, 'API key verification failed', 500);
  }
};

module.exports = {
  protect,
  apiKeyAuth
};