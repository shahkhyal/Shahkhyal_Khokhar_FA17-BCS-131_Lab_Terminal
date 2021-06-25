const match = require('../models/match');
const { Match, matchSchema } = require('../models/match');
const _ = require('underscore');
const mongoose = require('mongoose');

exports.addMatch = async (req, res, next) => {
  try {
    req.body = await matchSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.details);
  }

  const match = new Match(req.body, _.pick(['city', 'date', 'teamA', 'teamB']));

  await match.save();

  return res.status(200).send(match);
};

exports.getOne = async (req, res, next) => {
  const matchId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(matchId))
    return res.status(400).send('Invalid ObjectId');

  const match = await Match.findById(matchId);

  if (!match) return res.status(400).send('No match found with this id');

  return res.status(200).send(match);
};

exports.getAll = async (req, res, next) => {
  const matches = await Match.find();

  if (match.length === 0) return res.status(400).send('no matches found');

  return res.status(200).send(matches);
};

exports.deleteOne = async (req, res, next) => {
  const matchId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(matchId))
    return res.status(400).send('Invalid objectId');

  const match = await Match.findByIdAndDelete(matchId);

  if (!match) return res.status(400).send(`No match found with this id.`);

  return res.status(200).send(match);
};

exports.updateOne = async (req, res, next) => {
  const matchId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(matchId))
    return status(400).send('Invalid objectId');

  let validatedBody = null;
  try {
    validatedBody = await matchSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(200).send(error.details);
  }

  const match = await Match.findOne({ _id: matchId });

  match.city = validatedBody.city;
  match.date = validatedBody.date;
  match.teamA = validatedBody.teamA;
  match.teamB = validatedBody.teamB;

  await match.save();

  return res.status(200).send(match);
};
