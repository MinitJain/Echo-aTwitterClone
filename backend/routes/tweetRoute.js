import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  likeorDislikeTweet,
} from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTweet);
router.delete("/delete/:id", isAuthenticated, deleteTweet);
router.put("/like/:id", isAuthenticated, likeorDislikeTweet);
router.get("/allTweets/:id", isAuthenticated, getAllTweets);
export default router;
