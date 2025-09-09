// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models');

const SECRET = process.env.JWT_SECRET; 

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.json({
      status: true,
      data: { id: user.id, username: user.username },
      message: "User registered successfully"
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password);
    const user = await User.findOne({ where: { username } });
    console.log("Found user:", user); // 👈 ADD THIS
    if (!user) {
      return res.status(401).json({
        status: false,
        data: [],
        message: "Invalid credentials"
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    console.log("Password valid?", valid);
    if (!valid) {
      return res.status(401).json({
        status: false,
        data: [],
        message: "Invalid credentials"
      });
      
    }
    console.log("Before increment:", user.tokenVersion);
    user.tokenVersion += 1;
    await user.save();
    console.log("After increment:", user.tokenVersion);
    // create JWT with 30 second expiry
    const token = jwt.sign({ id: user.id, 
        username: user.username, 
        tokenVersion: user.tokenVersion 
    }, SECRET, { expiresIn: "120s" });

    res.json({
      status: true,
      data: { token },
      message: "Login successful"
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    });
  }
};
