import jwt from "jsonwebtoken";
import User from "../models/User.js";

// HELPERS
const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } =
      req.body;

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

    console.error("signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
