import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";

dotenv.config({
  path: ".env",
});

databaseConnection();
const app = express();

//middlewares (works b/w request and response)
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json()); // Parses JSON requests
app.use(cookieParser()); // Parses cookies

//api
app.use("/api/v1/user", userRoute);
//localhost:8080/api/v1/user/register

http: app.get("/home", (req, res) => {
  res.status(200).json({
    message: "coming from backend..",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen at port ${process.env.PORT}`);
});
