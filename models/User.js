const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const filter =
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return filter.test(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role: {
    type: [String],
    default: ['STUDENT'],
  },
  accountStatus: {
    type: String,
    enum: ['PENDING', 'ACTIVE', 'REJECTED'],
    default: 'PENDING',
  },
});

userSchema.pre('save', async function (next) {
  // if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = model('User', userSchema);

module.exports = User;
