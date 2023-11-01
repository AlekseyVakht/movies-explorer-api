const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('./constants');

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }).unknown(true)
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }).unknown(true)
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email()
  }).unknown(true)
});

const validatePostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required()
  }).unknown(true)
});

const validateDeleteMovie = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24)
  }).unknown(true)
});

module.exports = {
  validateSignin,
  validateSignup,
  validateUserUpdate,
  validatePostMovie,
  validateDeleteMovie
};
