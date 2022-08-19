const { findUserByProperty, createUser } = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const error = require('../utils/error');

const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty('email', email);
  if (user) {
    throw error('invalid credential', 400);
  }
  return createUser({ name, email, password });
};

const loginService = async (email, password) => {
  let user = await findUserByProperty('email', email);

  if (!user) {
    throw error('invalid credential', 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw error('invalid credential', 400);
  }
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, 'private-key', { expiresIn: '24h' });
};
module.exports = {
  registerService,
  loginService,
};
