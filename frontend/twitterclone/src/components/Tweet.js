import React, { useState } from "react";
import Avatar from "react-avatar";
import {
  RiChat1Line,
  RiHeart3Line,
  RiHeart3Fill,
  RiBookmarkLine,
} from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs"; // three dots icon
import axios from "axios";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { bookmarkUpdate } from "../redux/userSlice";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const [likes, setLikes] = useState(tweet?.likes || []);
  const [showMenu, setShowMenu] = useState(false); // toggle dropdown

  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (id) => {
    try {
      const alreadyLiked = likes.includes(user?._id);
      let updatedLikes;

      if (alreadyLiked) {
        updatedLikes = likes.filter((uid) => uid !== user._id);
      } else {
        updatedLikes = [...likes, user._id];
      }
      setLikes(updatedLikes); // update UI instantly

      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(getRefresh()); // refetch fresh data
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };
  const deleteTweetHandler = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this tweet?"
      );
      if (!confirmDelete) return;

      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Tweet deleted!");
        dispatch(getRefresh()); // re-fetch tweets
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete tweet");
      console.error(error);
    }
  };

  // Handle bookmarking and unbookmarking of tweets
  const bookmarkHandler = async (tweetId) => {
    if (!user) {
      toast.error("Please login to bookmark tweets");
      return;
    }

    try {
      // update UI
      dispatch(bookmarkUpdate(tweetId));

      // Make API call to update bookmark on the server
      const res = await axios.put(
        `${USER_API_END_POINT}/bookmark/${tweetId}`,
        { id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(getRefresh());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to bookmark tweet");
      // Revert optimistic update
      dispatch(bookmarkUpdate(tweetId));
      console.error("Bookmark error:", error);
    }
  };

  return (
    <div className="relative mt-2">
      <div className="bg-white shadow-sm hover:shadow-md transition rounded-2xl p-4 mb-4 border border-gray-100">
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <Avatar
            src=""
            name={tweet?.userDetails?.[0]?.name || "User"}
            size="40"
            round={true}
          />

          <div className="w-full">
            {/* Header */}
            <div className="flex items-center space-x-2">
              <h1 className="font-semibold">{tweet?.userDetails?.[0]?.name}</h1>
              <p className="text-gray-500 text-sm">
                @{tweet?.userDetails?.[0]?.username}
              </p>
            </div>

            {/* Description */}
            <p className="mt-2 text-gray-800 text-[15px] leading-relaxed">
              {tweet?.description}
            </p>

            {/* Actions */}
            <div className="flex justify-around mt-3 text-gray-500">
              {/* like */}
              <button
                onClick={() => likeOrDislikeHandler(tweet?._id)}
                className="flex items-center space-x-1 rounded-full p-2
                           hover:bg-red-50 hover:text-red-500
                           transition-all duration-200 ease-out
                           hover:scale-[1.05] active:scale-[0.95]"
              >
                {likes.includes(user?._id) ? (
                  <RiHeart3Fill size={18} className="text-red-500" />
                ) : (
                  <RiHeart3Line size={18} />
                )}
                <span
                  className={`text-sm ${
                    likes.includes(user?._id) ? "text-red-500" : ""
                  }`}
                >
                  {likes.length}
                </span>
              </button>

              {/* bookmark */}
              <button
                onClick={() => bookmarkHandler(tweet?._id)}
                className="flex items-center space-x-1 rounded-full p-2
                           hover:bg-green-50 hover:text-green-500
                           transition-all duration-200 ease-out
                           hover:scale-[1.05] active:scale-[0.95]"
              >
                {user?.bookmarks?.includes(tweet?._id) ? (
                  <RiBookmarkLine
                    size={18}
                    className="text-green-500 fill-current"
                  />
                ) : (
                  <RiBookmarkLine size={18} />
                )}
                <span
                  className={`text-sm ${
                    user?.bookmarks?.includes(tweet?._id)
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {user?.bookmarks?.includes(tweet?._id) ? "Saved" : "Save"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 dots menu only for owner */}
      {user?._id === tweet?.userId?._id && (
        <div className="absolute top-3 right-5">
          <div
            onClick={() => setShowMenu((prev) => !prev)}
            className="rounded-full cursor-pointer p-2 hover:bg-gray-100 transition"
          >
            <BsThreeDots size={20} />
          </div>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md">
              <button
                onClick={() => {
                  deleteTweetHandler(tweet?._id);
                  setShowMenu(false);
                }}
                className="flex items-center px-3 py-2 text-sm text-red-500 hover:bg-red-50 w-full"
              >
                <MdDeleteOutline className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tweet;
