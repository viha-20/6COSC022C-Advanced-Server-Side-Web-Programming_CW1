const User = require('../models/User');
const ApiKey = require('../models/ApiKey');
const bcrypt = require('bcryptjs');

class AuthService {
  static async register(username, email, password) {
    console.log(`Registering user: ${username}`);
    const existingUser = await User.findByUsername(username);
    if (existingUser) throw new Error('Username already exists');

    const existingEmail = await User.findByEmail(email);
    if (existingEmail) throw new Error('Email already exists');

    await User.create(username, email, password);
    console.log(`User registered successfully: ${username}`);
  }

  static async login(username, password) {
    console.log(`Logging in user: ${username}`);
    const user = await User.findByUsername(username);
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');

    // Generate and store API key
    const apiKey = await ApiKey.create(user.id);
    console.log(`API key generated for user: ${username}`);
    return { apiKey };
  }

  static async logout(userId) {
    console.log(`Logging out user with ID: ${userId}`);
    const deletedCount = await ApiKey.deleteByUserId(userId);
    if (deletedCount > 0) {
      console.log(`API key deleted for user with ID: ${userId}`);
    } else {
      console.log(`No API key found for user with ID: ${userId}`);
    }
  }
}

module.exports = AuthService;