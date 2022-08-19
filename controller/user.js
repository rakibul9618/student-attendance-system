const userService = require('../service/user');
const error = require('../utils/error');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.findAllUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};
const createUser = async (req, res, next) => {
  const { name, email, password, role, accountStatus } = req.body;

  try {
    const user = await userService.createUser({
      name,
      email,
      password,
      role,
      accountStatus,
    });

    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};
const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) throw error('User not found', 404);
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, role, accountStatus } = req.body;

  try {
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error('User not found', 404);
    }
    user.name = name ?? user.name;
    user.role = role ?? user.role;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
const putUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, role, accountStatus } = req.body;
  try {
    const user = await userService.updateUser(userId, {
      name,
      email,
      role,
      accountStatus,
    });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error('User not found', 404);
    }
    await user.remove();
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  patchUserById,
  putUser,
  deleteUserById,
};
