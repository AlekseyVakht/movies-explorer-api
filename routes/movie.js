const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getMovies,
  postMovie,
  deleteMovie
} = require('../controllers/movie');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().required()
  }).unknown(true)
}), postMovie);

router.delete('/_id', celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required()
  }).unknown(true)
}), deleteMovie);

module.exports = router;
