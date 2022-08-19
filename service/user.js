const User = require('../models/User');
const error = require('../utils/error');

const findUserByProperty = (key, value) => {
  if (key === '_id') return User.findById(value);
  return User.findOne({ [key]: value });
};

const createUser = async ({ name, email, password, role, accountStatus }) => {
  let user = await findUserByProperty('email', email);
  if (user) {
    throw error('invalid credential', 400);
  }
  user = new User({
    name,
    email,
    password,
    role: role ? role : ['STUDENT'],
    accountStatus: accountStatus ? accountStatus : 'PENDING',
  });
  return user.save();
};

const findAllUsers = () => {
  return User.find();
};

const updateUser = async (id, data) => {
  const user = await findUserByProperty('_id', id);
  if (!user) {
    throw error('User not found', 404);
  }

  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = {
  findUserByProperty,
  createUser,
  findAllUsers,
  updateUser,
};
