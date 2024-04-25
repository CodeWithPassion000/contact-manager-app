const express = require('express');

const router = express.Router();

const {
  getCurrentUser,
  signInUser,
  registerUser,
} = require('../controllers/authController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/register', registerUser);

router.post('/login', signInUser);

router.get('/current', validateToken, getCurrentUser);

module.exports = router;
