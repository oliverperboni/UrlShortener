const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
require('dotenv').config()

const saltRounds = 10;


const JWT_SECRET = process.env.SECRET_KEY; 
const JWT_EXPIRATION = '1h'; 

exports.registerUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

exports.loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Gerar o token JWT
      const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
