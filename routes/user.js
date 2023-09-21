const router = require('express').Router();

const { validateUserUpdate } = require('../utils/validation');
const {
  getCurrentUser,
  updateUser
} = require('../controllers/user');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
