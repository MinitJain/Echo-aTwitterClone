import express from "express";
import {
  createTweet,
  deleteTweet,
  likeorDislikeTweet,
} from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTweet);
router.delete("/delete/:id", isAuthenticated, deleteTweet);
router.put("/like/:id", isAuthenticated, likeorDislikeTweet);
export default router;
