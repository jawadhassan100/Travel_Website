const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//& Admin signup

// Register a user with the specific email
exports.register = async (req, res) => {
  const { email, password } = req.body;
  
  const allowedEmail = "jawadhassankhan2001@gmail.com";
  
  // Check if the email matches the allowed email
  if (email !== allowedEmail) {
    return res.status(403).json({ msg: "Registration is only allowed for a specific user" });
  }

  try {
    let user = await User.findOne({ email });

    // If the user already exists, prevent registration
    if (user) {
      return res.status(400).json({ msg: "User already registered" });
    }

    // Create and save the user with the hashed password
   
    user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      isAdmin: true, // Since this is the only user
    });

    await user.save();
    
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//& Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const allowedEmail = "jawadhassankhan2001@gmail.com";

  // Only allow login for the specific user
  if (email !== allowedEmail) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  // Generate JWT token
  const payload = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 259200000, // 3 days
  });

  res.status(200).json({
    msg: "Login successful",
    token,
    user: {
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

//& Admin Logout
exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ msg: "Logged out successfully" });
};
