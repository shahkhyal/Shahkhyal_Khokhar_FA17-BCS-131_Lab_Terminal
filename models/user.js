const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { boolean } = require('joi');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 55,
    required: true
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 55,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 2228,
    required: true
  },
  isAdmin: {
    type: Boolean
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      isAdmin: this.isAdmin
    },
    config.get('jwtPrivateKey'),
    {
      expiresIn: '7d'
    }
  );
  return token;
};

const joiUserSchema = Joi.object({
  firstName: Joi.string().min(1).max(55).required().trim().lowercase(),
  lastName: Joi.string().min(1).max(55).required().trim().lowercase(),
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().min(8).max(128)
});

module.exports = {
  userSchema: joiUserSchema,
  User: mongoose.model('User', userSchema)
};
