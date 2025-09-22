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

      if (res.data.success) dispatch(getRefresh());
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

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

  const tweetUser = tweet?.userId; // populated user info

  return (
    <div className="relative">
      <article className="bg-white border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200 group">
        <div className="p-6">
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {tweetUser?.profileImageUrl ? (
                <img
                  src={tweetUser.profileImageUrl}
                  alt={tweetUser.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
              ) : (
                <Avatar
                  name={tweetUser?.name || "User"}
                  size="48"
                  round={true}
                  className="ring-2 ring-white shadow-sm"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-semibold text-gray-900 text-[15px] tracking-[-0.01em] truncate">
                  {tweetUser?.name}
                </h2>
                <span className="text-gray-500 text-[14px] truncate">
                  @{tweetUser?.username}
                </span>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-gray-900 text-[15px] leading-relaxed whitespace-pre-wrap">
                  {tweet?.description}
                </p>
              </div>

              {/* Actions */}
              <div
                className={`flex items-center ${
                  user?._id === tweetUser?._id
                    ? "justify-between"
                    : "justify-center gap-8"
                } mt-2`}
              >
                {/* Like */}
                <button
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="group/like flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 transition-all duration-200 active:scale-95"
                >
                  {likes.includes(user?._id) ? (
                    <RiHeart3Fill size={18} className="text-red-500" />
                  ) : (
                    <RiHeart3Line
                      size={18}
                      className="text-gray-500 group-hover/like:text-red-500"
                    />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      likes.includes(user?._id)
                        ? "text-red-500"
                        : "text-gray-500 group-hover/like:text-red-500"
                    }`}
                  >
                    {likes.length}
                  </span>
                </button>

                {/* Bookmark */}
                <button
                  onClick={() => bookmarkHandler(tweet?._id)}
                  className="group/bookmark flex items-center gap-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-200 active:scale-95"
                >
                  <RiBookmarkLine
                    size={18}
                    className={`${
                      user?.bookmarks?.includes(tweet?._id)
                        ? "text-blue-500 fill-current"
                        : "text-gray-500 group-hover/bookmark:text-blue-500"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      user?.bookmarks?.includes(tweet?._id)
                        ? "text-blue-500"
                        : "text-gray-500 group-hover/bookmark:text-blue-500"
                    }`}
                  >
                    {user?.bookmarks?.includes(tweet?._id) ? "Saved" : "Save"}
                  </span>
                </button>

                {/* Delete */}
                {user?._id === tweetUser?._id && (
                  <button
                    onClick={() => {
                      setTweetToDelete(tweet._id);
                      setShowDeleteConfirm(true);
                    }}
                    className="group/delete flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 transition-all duration-200 active:scale-95"
                  >
                    <MdDeleteOutline
                      size={18}
                      className="text-gray-500 group-hover/delete:text-red-500"
                    />
                    <span className="text-sm font-medium text-gray-500 group-hover/delete:text-red-500">
                      Delete
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 tracking-[-0.01em]">
                Delete Tweet?
              </h2>
              <p className="text-gray-600 text-[15px] mb-6">
                This action cannot be undone. Your tweet will be permanently
                deleted.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-2.5 text-gray-700 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-200 active:scale-95 text-[15px]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteTweetHandler(tweetToDelete);
                    setShowDeleteConfirm(false);
                  }}
                  className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-all duration-200 active:scale-95 text-[15px] shadow-sm hover:shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tweet;
