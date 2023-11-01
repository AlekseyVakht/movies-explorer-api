const router = require('express').Router();
const { validateSignin, validateSignup } = require('../utils/validation');
const {
  createUser,
  Login
} = require('../controllers/user');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');

router.post('/signin', validateSignin, Login);

router.post('/signup', validateSignup, createUser);

router.use(auth);
router.use('/users', require('./user'));
router.use('/movies', require('./movie'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Not Found'));
});

module.exports = router;
