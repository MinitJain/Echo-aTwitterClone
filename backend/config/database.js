import mongoose from "mongoose";

const databaseConnection = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB connected successfully");
      break;
    } catch (error) {
      retries -= 1;
      console.error(`MongoDB connection failed. Retries left: ${retries}`);
      if (!retries) throw error;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

export default databaseConnection;
