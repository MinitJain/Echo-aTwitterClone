import mongoose from "mongoose";
// Defines tweet structure
const tweetSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId, // References the User model (creates a relationship)
      ref: "User", // Links to the User collection
      required: true,
    },
    userDetails: {
      type: Array,
      default: [],
    },
  },

  { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
