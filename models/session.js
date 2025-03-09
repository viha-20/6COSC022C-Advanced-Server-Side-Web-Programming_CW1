const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

class Session {
  static async create(userId) {
    const sessionId = uuidv4(); // Generate session ID
    const apiKey = uuidv4(); // Generate API key
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO sessions (user_id, session_id, api_key) VALUES (?, ?, ?)',
        [userId, sessionId, apiKey],
        function (err) {
          if (err) reject(err);
          else resolve({ sessionId, apiKey });
        }
      );
    });
  }

  static async findBySessionId(sessionId) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM sessions WHERE session_id = ?', [sessionId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async findByApiKey(apiKey) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM sessions WHERE api_key = ?', [apiKey], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async deleteBySessionId(sessionId) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM sessions WHERE session_id = ?', [sessionId], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = Session;