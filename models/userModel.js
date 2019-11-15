const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email'],
    unique: [true, 'User already exist'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  printer: {
    type: String,
    enum: {
      values: [
        'Skimpy',
        'Dwindle',
        'Postal',
        'Breezy'
      ],
      message: 'must be selected'
    }
  },
  submission1: {
    type: String
  },
  submission2: {
    type: String
  },
  round1: [String],
  round2: [String],
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords doesn't match!"
    }
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  printStatus: {
    type: String,
    enum: ['received', 'printing', 'prepared', 'shipped', 'delivered']
  }
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email must be unique'));
  } else {
    next(error);
  }
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
