const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerService, loginService } = require('../service/auth');

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ message: 'invalid Data' });
  }
  try {
    const user = await registerService({ name, email, password });
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService(email, password);

    return res.status(200).json({ message: 'Login successful', token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerController,
  loginController,
};
