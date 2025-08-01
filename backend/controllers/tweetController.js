import express from "express";
import { Tweet } from "../models/tweetSchema.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;

    if (!description || !id) {
      return res.status(400).json({
        message: "Description and user ID are required.",
        success: false,
      });
    }

    await Tweet.create({
      description,
      userId: id,
    });

    return res.status(201).json({
      message: "Tweet created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while creating the tweet.",
      success: false,
    });
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Tweet deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeorDislikeTweet = async (req, res) => {
  try {
    const LoggedInUserId = req.body.id;
    const tweetId = req.params.id;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found.",
        success: false,
      });
    }

    if (tweet.like.includes(LoggedInUserId)) {
      // If the user has already liked the tweet, so we remove the like
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: LoggedInUserId },
      });

      return res.status(200).json({
        message: "User disliked your tweet.",
        success: true,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: LoggedInUserId },
      });
      return res.status(200).json({
        message: "User liked your tweet.",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while liking or disliking the tweet.",
      success: false,
    });
  }
};
