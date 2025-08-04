import { User } from "../models/userSchema.js";
import { Tweet } from "../models/tweetSchema.js";
import { getOtherUserProfile } from "./userController.js";

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
export const getAllTweets = async (req, res) => {
  try {
    const id = req.params.id;

    const loggedInUser = await User.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({
        message: "Logged-in user not found.",
        success: false,
      });
    }

    const loggedInUserTweets = await Tweet.find({ userId: id });

    const followingUsersTweets = await Promise.all(
      loggedInUser.following.map(async (followedUserId) => {
        return await Tweet.find({ userId: followedUserId });
      })
    );

    return res.status(200).json({
      message: "All tweets fetched successfully.",
      success: true,
      tweets: [...loggedInUserTweets, ...followingUsersTweets.flat()],
    });
  } catch (error) {
    console.log("GetAllTweets Error:", error);
    return res.status(500).json({
      message: "Error in fetching tweets.",
      success: false,
    });
  }
};

export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;

    const loggedInUser = await User.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({
        message: "Logged-in user not found.",
        success: false,
      });
    }

    const followingUsersTweets = await Promise.all(
      //If you just loop with forEach() or map() without Promise.all, your code won’t wait for the async DB calls (Tweet.find(...)) to finish before moving on.
      loggedInUser.following.map(async (followedUserId) => {
        return await Tweet.find({ userId: followedUserId });
      })
    );

    return res.status(200).json({
      message: "All tweets fetched successfully.",
      success: true,
      tweets: followingUsersTweets.flat(),
    });
  } catch (error) {
    console.log("getFollowingTweets Error:", error);
    return res.status(500).json({
      message: "Error in fetching following tweets.",
      success: false,
    });
  }
};
