import React, { useState } from "react";
import Avatar from "react-avatar";
import { RiHeart3Line, RiHeart3Fill, RiBookmarkLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { bookmarkUpdate } from "../redux/userSlice";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const [likes, setLikes] = useState(tweet?.likes || []);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tweetToDelete, setTweetToDelete] = useState(null);

  const dispatch = useDispatch();

  // Like/Dislike handler
  const likeOrDislikeHandler = async (id) => {
    try {
      const alreadyLiked = likes.includes(user?._id);
      const updatedLikes = alreadyLiked
        ? likes.filter((uid) => uid !== user._id)
        : [...likes, user._id];

      setLikes(updatedLikes);

      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(getRefresh());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  // Delete handler
  const deleteTweetHandler = async (id) => {
    try {
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Tweet deleted successfully!");
        dispatch(getRefresh());
        window.dispatchEvent(
          new CustomEvent("tweetDeleted", { detail: { tweetId: id } })
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete tweet");
      console.error(error);
    }
  };

  // Bookmark handler
  const bookmarkHandler = async (tweetId) => {
    if (!user) {
      toast.error("Please login to bookmark tweets");
      return;
    }

    try {
      dispatch(bookmarkUpdate(tweetId));

      const res = await axios.put(
        `${USER_API_END_POINT}/bookmark/${tweetId}`,
        { id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(getRefresh());
        window.dispatchEvent(new CustomEvent("bookmarkUpdated"));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to bookmark tweet");
      dispatch(bookmarkUpdate(tweetId)); // revert optimistic update
      console.error("Bookmark error:", error);
    }
  };

  return (
    <div className="relative mt-2">
      <div className="bg-white shadow-sm hover:shadow-md transition rounded-2xl p-4 mb-4 border border-gray-100">
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          {tweet?.userDetails?.[0]?.profileImageUrl ? (
            <img
              src={tweet.userDetails[0].profileImageUrl}
              alt={tweet.userDetails[0].name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <Avatar
              name={tweet?.userDetails?.[0]?.name || "User"}
              size="40"
              round={true}
            />
          )}

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

              {/* delete - only show for tweet owner */}
              {user?._id === tweet?.userId?._id && (
                <button
                  onClick={() => {
                    setTweetToDelete(tweet._id);
                    setShowDeleteConfirm(true);
                  }}
                  className="flex items-center space-x-1 rounded-full p-2
                             hover:bg-red-50 hover:text-red-500
                             transition-all duration-200 ease-out
                             hover:scale-[1.05] active:scale-[0.95]"
                >
                  <MdDeleteOutline size={18} />
                  <span className="text-sm">Delete</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this tweet?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTweetHandler(tweetToDelete);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tweet;
