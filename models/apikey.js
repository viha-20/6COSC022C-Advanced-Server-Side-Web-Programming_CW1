const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

class ApiKey {
  static async create(userId) {
    const apiKey = uuidv4(); // Generate UUID for API key
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)',
        [userId, apiKey],
        function (err) {
          if (err) reject(err);
          else resolve(apiKey);
        }
      );
    });
  }

  static async findByKey(apiKey) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM api_keys WHERE api_key = ?', [apiKey], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async deleteByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM api_keys WHERE user_id = ?', [userId], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = ApiKey;