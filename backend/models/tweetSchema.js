import mongoose from "mongoose";
// Defines tweet structure
const tweetSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    like: {
      type: Array,
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // References the User model (creates a relationship)
      ref: "User", // Links to the User collection
    },
    bookmarks: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
  },

  { timestamps: true }
);

export const Tweet = mongoose.model("tweet", tweetSchema);
