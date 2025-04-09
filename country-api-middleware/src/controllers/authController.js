const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken, revokeApiKeyForUser } = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// const register = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return errorResponse(res, 'Validation errors', 400, errors.array());
//   }

//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return errorResponse(res, 'User already exists with this email', 400);
//     }

//     const user = await User.create({ username, email, password });
//     successResponse(res, { 
//       user: { id: user.id, username: user.username, email: user.email }
//     }, 'Registration successful. Please login to get your token.', 201);
//   } catch (error) {
//     console.error('Registration error:', error);
//     errorResponse(res, 'Registration failed', 500);
//   }
// };


const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation errors', 400, errors.array());
  }

  const { username, email, password } = req.body;

  try {
    console.log('Registration attempt for:', email); // Log registration attempt
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('User already exists:', email);
      return errorResponse(res, 'User already exists with this email', 400);
    }

    const user = await User.create({ username, email, password });
    console.log('User created successfully:', user.id); // Log success
    
    successResponse(res, { 
      user: { id: user.id, username: user.username, email: user.email }
    }, 'Registration successful. Please login to get your token.', 201);
  } catch (error) {
    console.error('Registration error:', error);
    errorResponse(res, error.message || 'Registration failed', 500);
  }
};



const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation errors', 400, errors.array());
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    const token = generateToken(user.id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    successResponse(res, { 
      user: { id: user.id, username: user.username, email: user.email },
      token
    }, 'Login successful. Use this token to generate an API key.');
  } catch (error) {
    console.error('Login error:', error);
    errorResponse(res, 'Login failed', 500);
  }
};

const logout = async (req, res) => {
  try {
    // Revoke API key (set key to null)
    await revokeApiKeyForUser(req.user.id);
    
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    
    successResponse(res, null, 'Logout successful. API key revoked and token expired.');
  } catch (error) {
    console.error('Logout error:', error);
    errorResponse(res, 'Logout failed', 500);
  }
};


const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'createdAt']
    });
    
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    
    successResponse(res, { user }, 'Current user retrieved');
  } catch (error) {
    console.error('Get current user error:', error);
    errorResponse(res, 'Failed to get current user', 500);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};