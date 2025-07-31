import express from "express";
import { createTweet } from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();
router.post("/create", isAuthenticated, createTweet);
router.delete("/delete/:id", deleteTweet);

export default router;
