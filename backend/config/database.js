import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("Missing required environment variable: MONGO_URI");
}

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

const databaseConnection = async (retries = 0) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB"); // Uncomment for visibility
    return true;
  } catch (error) {
    console.error(`❌ MongoDB connection error (attempt ${retries + 1}/${MAX_RETRIES}):`, error.message);
    
    if (retries < MAX_RETRIES) {
      console.log(`⏳ Retrying in ${RETRY_DELAY_MS}ms...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return databaseConnection(retries + 1);
    } else {
      throw new Error("Failed to connect to MongoDB after multiple attempts");
    }
  }
};

export default databaseConnection;