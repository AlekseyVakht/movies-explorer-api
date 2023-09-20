require('dotenv').config();
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { limiter } = require('./middlewares/ratelimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  createUser,
  Login
} = require('./controllers/user');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors/NotFoundError');
const { errorHandler } = require('./middlewares/errorhandler');

const { PORT, DATABASE_URL, NODE_ENV } = process.env;

const app = express();

app.use(helmet);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : 'dev-secret');

app.use(requestLogger);
app.use(cors());
app.use(limiter);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }).unknown(true)
}), Login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }).unknown(true)
}), createUser);

app.use(auth);

app.use('/users', require('./routes/user'));
app.use('/movies', require('./routes/movie'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Not Found'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
