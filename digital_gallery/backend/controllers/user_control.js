const jwt = require('jsonwebtoken');
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await userModel.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { name: existingUser.name, id: existingUser._id }, 
        'anystring', 
        { expiresIn: '1h' }
      );
  
      res.cookie('auth', token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
        sameSite: 'strict'
      });
  
      res.status(200).json({ 
        user: {
          name: existingUser.name,
          email: existingUser.email
        },
        token 
      });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
      console.error('Error in userLogin:', error);
    }
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ 
      $or: [{ email }, { name }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: "User with this email or name already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // Store hashed password
    });
    
    await newUser.save();

    const token = jwt.sign(
      { name: newUser.name, id: newUser._id },
     'anystring',
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email
      },
      token
    });
  } catch (error) {
    console.error("Error during User registration:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { userLogin, userSignup };
