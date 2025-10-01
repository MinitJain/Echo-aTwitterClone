import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv.config({
//   path: ".env",
// });
dotenv.config(); // Loads environment variables from a .env file into process.env

// Validate required environment variables
if (!process.env.MONGO_URI) {
  throw new Error("Missing required environment variable: MONGO_URI");
}

// MongoDB connection with retry logic
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

const databaseConnection = async (retries = 0) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // Use a logger here instead of console.log
    // logger.info("Connected to mongoDB");
  } catch (error) {
    // logger.error("MongoDB connection error:", error);
    if (retries < MAX_RETRIES) {
      setTimeout(() => {
        databaseConnection(retries + 1);
      }, RETRY_DELAY_MS);
    } else {
      throw new Error("Failed to connect to MongoDB after multiple attempts");
    }
  }
};

export default databaseConnection;
