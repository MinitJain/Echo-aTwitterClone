//auth.js — Authentication Middleware using JWT

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

dotenv.config(); // No need for { path }, // This loads from .env automatically,

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;

    console.log("Decoded Token:", decoded);

    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};
export default isAuthenticated;
