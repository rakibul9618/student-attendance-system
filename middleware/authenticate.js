const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    token = token.split(' ')[1];
    const decode = jwt.verify(token, 'private-key');
    const user = await User.findById(decode._id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
