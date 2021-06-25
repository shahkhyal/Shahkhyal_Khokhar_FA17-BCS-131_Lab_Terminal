const mongoose = require('mongoose');
const Joi = require('joi');

const matchSchema = new mongoose.Schema({
  city: {
    required: true,
    type: String
  },
  date: {
    required: true,
    type: Date
  },
  teamA: {
    required: true,
    type: String
  },
  teamB: {
    required: true,
    type: String
  }
});

const joiMatchSchema = Joi.object({
  city: Joi.string().required(),
  date: Joi.date().iso(),
  teamA: Joi.string().required(),
  teamB: Joi.string().required()
});

module.exports = {
  Match: mongoose.model('Match', matchSchema),
  matchSchema: joiMatchSchema
};
