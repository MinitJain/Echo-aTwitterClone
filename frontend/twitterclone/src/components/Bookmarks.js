import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import Tweet from "./Tweet";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";

const Bookmarks = () => {
  const { user } = useSelector((store) => store.user);
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Fetch bookmarked tweets
  const fetchBookmarkedTweets = async () => {
    if (!user || !user.bookmarks || user.bookmarks.length === 0) {
      setBookmarkedTweets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Filter out any invalid tweet IDs
      const validTweetIds = user.bookmarks.filter(
        (id) => id && typeof id === "string"
      );

      if (validTweetIds.length === 0) {
        setBookmarkedTweets([]);
        setLoading(false);
        return;
      }

      const tweetPromises = validTweetIds.map((tweetId) =>
        axios
          .get(`${TWEET_API_END_POINT}/tweet/${tweetId}`, {
            withCredentials: true,
          })
          .catch((error) => {
            console.warn(`Failed to fetch tweet ${tweetId}:`, error);
            return null; // Return null for failed requests
          })
      );

      const responses = await Promise.all(tweetPromises);
      const tweets = responses
        .filter(
          (response) => response && response.data && response.data.success
        )
        .map((response) => response.data.tweet);

      setBookmarkedTweets(tweets);
    } catch (error) {
      console.error("Error fetching bookmarked tweets:", error);
      toast.error("Failed to load bookmarked tweets");
      setBookmarkedTweets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarkedTweets();
  }, [user?.bookmarks]);

  // Listen for bookmark updates and refresh the list
  useEffect(() => {
    const handleBookmarkUpdate = () => {
      fetchBookmarkedTweets();
    };

    // Add event listener for bookmark updates
    window.addEventListener("bookmarkUpdated", handleBookmarkUpdate);

    return () => {
      window.removeEventListener("bookmarkUpdated", handleBookmarkUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-[50%] border-l border-r border-gray-200 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Bookmarks</h1>
            <p className="text-gray-500 text-sm">
              {bookmarkedTweets.length}{" "}
              {bookmarkedTweets.length === 1 ? "tweet" : "tweets"} saved
            </p>
          </div>
          {bookmarkedTweets.length > 0 && (
            <button
              onClick={fetchBookmarkedTweets}
              className="px-3 py-1 text-sm text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
            >
              Refresh
            </button>
          )}
        </div>
      </div>

      {/* Bookmarks Content */}
      <div>
        {bookmarkedTweets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Save tweets for later
              </h2>
              <p className="text-gray-500 max-w-sm">
                When you bookmark tweets, they'll show up here. Bookmark tweets
                to easily find them again in the future.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {bookmarkedTweets.map((tweet) => (
              <Tweet key={tweet._id} tweet={tweet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
