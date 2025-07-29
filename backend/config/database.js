import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI) //Connects to your MongoDB database using the connection string from environment variables
    // Uses promises to handle success/error cases
    .then(() => {
      console.log("Connected to mongoDB"); //Logs the connection status
    })
    .catch((error) => {
      console.log(error); // Logs the connection status
    });
};

export default databaseConnection;
