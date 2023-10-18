const router = require('express').Router();

const { validatePostMovie, validateDeleteMovie } = require('../utils/validation');
const {
  getMovies,
  postMovie,
  deleteMovie
} = require('../controllers/movie');

router.get('/', getMovies);

router.post('/', validatePostMovie, postMovie);

router.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
