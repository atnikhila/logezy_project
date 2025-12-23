const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Enums = require("../constants/enums");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // token expiry
  );
};

// Register
exports.register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully"
      // token
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await User.findOne({
      where: { email, status: Enums.USER_STATUS.ACTIVE }
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT
    const token = generateToken(user);

    //Success response
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
};
