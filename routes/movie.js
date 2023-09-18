const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number(),
    year: Joi.number(),
    image: Joi.string(),
    trailer: Joi.string(),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
    thumbnail: Joi.string(),
    movieId: Joi.number(),
  }).unknown(true),
}), postMovie);

router.delete('/_id', celebrate({
  body: Joi.object().keys({
    movieId: Joi.number(),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
