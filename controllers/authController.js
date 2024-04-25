const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Auth = require('../models/authModel');

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const userAvailable = await Auth.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log('Hashed password : ', hashedPassword);

  const user = await Auth.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data us not valid');
  }
  res.json({ message: 'Register the user' });
});

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const user = await Auth.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: '60m' }
    );

    res.status(200).json({
      accesToken,
    });
  } else {
    res.status(401);
    throw new Error('email or password is not valid');
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, signInUser, getCurrentUser };
