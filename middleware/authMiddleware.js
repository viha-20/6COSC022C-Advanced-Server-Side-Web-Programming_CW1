const Session = require('../models/Session');

const authenticate = async (req, res, next) => {
  const sessionId = req.header('Session-ID');
  if (!sessionId) return res.status(401).json({ error: 'Access denied. No session ID provided.' });

  try {
    const session = await Session.findBySessionId(sessionId);
    if (!session) return res.status(401).json({ error: 'Invalid session ID.' });

    req.userId = session.user_id;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid session ID.' });
  }
};

module.exports = authenticate;