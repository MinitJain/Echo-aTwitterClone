import { User } from "../models/userSchema.js";
import { Tweet } from "../models/tweetSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Controller
export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Basic field validation
    if (!name || !username || !email || !password) {
      console.log("Missing Fields:", name, username, email, password);
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use.",
        success: false,
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username }).lean();
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already in use.",
        success: false,
      });
    }

    // Hash the password securely
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create and save the new user
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Success response
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Login Controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic field validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
      });
    }

    // Find user by email
    const existingUser = await User.findOne({ email }).lean();
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid email or password.",
        success: false,
      });
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password.",
        success: false,
      });
    }

    // Generate JWT token
    const token = await jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token in cookie with correct expiry
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      })
      .json({
        message: `Welcome back! ${existingUser.name}`,
        success: true,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  // Clear the token cookie
  return res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire it immediately
    })
    .status(200)
    .json({
      message: "Logged out successfully",
      success: true,
    });
};

export const bookmark = async (req, res) => {
  try {
    const LoggedInUserId = req.body.id;
    const tweetId = req.params.id;

    const foundUser = await User.findById(LoggedInUserId);

    // If user doesn't exist
    if (!foundUser) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // If tweet is already bookmarked, remove it
    if (foundUser.bookmarks.includes(tweetId)) {
      await User.findByIdAndUpdate(LoggedInUserId, {
        $pull: { bookmarks: tweetId },
      });

      return res.status(200).json({
        message: "Bookmark removed successfully.",
        success: true,
      });
    } else {
      // If tweet is not bookmarked, add it
      await User.findByIdAndUpdate(LoggedInUserId, {
        $push: { bookmarks: tweetId },
      });

      return res.status(200).json({
        message: "Bookmark added successfully.",
        success: true,
      });
    }
  } catch (error) {
    console.log("Bookmark Error:", error);
    return res.status(500).json({
      message: "Error in saving bookmarks.",
      success: false,
    });
  }
};
