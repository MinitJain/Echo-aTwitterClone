import { user } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";

export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    //basic validation
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "email already in use",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);
    //                       Securely hashes passwords

    await user.create({
      // Saves new user to database
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      // Sends response back to client
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
