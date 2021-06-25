const { User, userSchema } = require('../models/user');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim().lowercase(),
  password: Joi.string().min(8).max(128).required()
});

exports.createUser = async (req, res, next) => {
  let validatedBody = null;
  try {
    validatedBody = await userSchema.validateAsync(req.body, {
      abortEarly: false
    });
  } catch (error) {
    return res.status(400).send(error.details);
  }

  user = new User(
    _.pick(validatedBody, ['firstName', 'lastName', 'email', 'isAdmin'])
  );

  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  //in case of error it goes to proccess listener defined in startup/logging.js
  await user.save();

  const token = user.generateAuthToken();

  res.status(200).send({
    token: token
  });
};

exports.loginUser = async (req, res, next) => {
  try {
    req.body = await loginSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.details);
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send('Invalid email or password.');
  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  req.user = user;
  const token = req.user.generateAuthToken();
  return res.status(200).send({ token });
};
