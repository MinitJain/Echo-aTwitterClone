import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (!description.trim()) {
      toast.error("Tweet cannot be empty!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
        setDescription(""); // clear input after posting
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const followingHandler = () => {
    dispatch(getIsActive(true));
  };

  const forYouHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-full bg-white border-l border-r border-gray-100 ">
      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="flex">
          <button
            onClick={forYouHandler}
            className={`flex-1 py-4 px-6 text-center transition-all duration-200 relative group ${
              !isActive
                ? "text-gray-900 font-semibold"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="text-[15px] tracking-[-0.01em]">For You</span>
            {!isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full"></div>
            )}
          </button>

          <button
            onClick={followingHandler}
            className={`flex-1 py-4 px-6 text-center transition-all duration-200 relative group ${
              isActive
                ? "text-gray-900 font-semibold"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="text-[15px] tracking-[-0.01em]">Following</span>
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full"></div>
            )}
          </button>
        </div>
      </div>

      {/* Create Post Section */}
      <div className="p-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
            ) : (
              <Avatar
                name={user?.name || "Guest"}
                size="48"
                round={true}
                className="ring-2 ring-white shadow-sm"
              />
            )}
          </div>

          {/* Input Area */}
          <div className="flex-1 min-w-0">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[120px] p-4 text-[18px] placeholder-gray-500 border border-gray-200 rounded-2xl focus:border-gray-300 focus:ring-0 focus:outline-none resize-none transition-all duration-200 leading-relaxed"
              placeholder="What's happening?"
              rows={4}
            />

            {/* Bottom Actions */}
            <div className="flex items-center justify-end mt-4">
              {/* <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200 active:scale-95">
                <CiImageOn size={22} />
              </button> */}

              <button
                onClick={submitHandler}
                disabled={loading || !description.trim()}
                className={`px-6 py-2.5  font-medium text-[15px] rounded-full transition-all duration-200 active:scale-[0.98] tracking-[-0.01em] ${
                  loading || !description.trim()
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md"
                }`}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-gray-50 border-t border-b border-gray-100"></div>
    </div>
  );
};

export default CreatePost;
