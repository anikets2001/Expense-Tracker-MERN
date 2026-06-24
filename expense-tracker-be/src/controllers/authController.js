import jwt from "jsonwebtoken";
import User from "../models/User.js";

// HELPERS
const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // required field validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // password confirmation check
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Duplicate email check
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // create user
    const user = await User.create({ firstName, lastName, email, password });
    user.password = undefined;

    // sign JWT
    const token = signToken(user._id);

    // respond - password stripped above since select:false doesn't apply to .create()'s returned document
    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      data: { user, token },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    // Race condition: two near-simultaneous signups with the same email both
    // pass the findOne check above; the loser hits the schema's unique index here.
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    console.error("signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const signIn = async (req, res) => {
  try {
  const { email, password } = req.body;

  // required field validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email & Password are required",
    });
  }

  // find user and explicitly select password (since select:false in schema)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  // verify password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  // strip password before sending response
  user.password = undefined;

  //sign JWT
  const token = signToken(user._id)

  return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      data: { user, token },
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};

// @desc    Get currently authenticated user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  // req.user is already set by the `protect` middleware (password excluded by select: false)
  return res.status(200).json({
    success: true,
    data: { user: req.user },
  });
};
