import { user } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";

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
    const existingUser = await user.findOne({ email }).lean();
    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use.",
        success: false,
      });
    }

    // Check if username already exists
    const existingUsername = await user.findOne({ username }).lean();
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already in use.",
        success: false,
      });
    }

    // Hash the password securely
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create and save the new user
    await user.create({
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
