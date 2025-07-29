import mongoose from "mongoose";

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

export const Tw = mongoose.model("tweet", tweetSchema);
