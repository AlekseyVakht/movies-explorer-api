const mongoose = require('mongoose');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Неправильный запрос'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Заправшиваемые данные не найдены');
      }
      if (((movie.owner).toString() !== req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить чужой фильм');
      }
      return Movie.deleteOne({ _id: movie._id })
        .then(() => res.send({ message: 'Удалено' }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Неправильный запрос'));
      } else {
        next(err);
      }
    });
};
