const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/user');

router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required(),
  }).unknown(true),
}), updateUser);

module.exports = router;
