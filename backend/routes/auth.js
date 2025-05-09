const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Check if username or email already exists
    if (await User.findOne({ $or: [{ email }, { username }] })) {
      return res.status(400).json({ msg: 'Username or email already in use' });
    }
  
    // Hash password
    const hash = await bcrypt.hash(password, 10);
  
    // Create and save new user
    const newUser = new User({ username, email, password: hash });
    await newUser.save();
  
    res.json({ msg: 'Registered successfully' });
  });
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid creds' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: 'Invalid creds' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  });
  
  module.exports = router;