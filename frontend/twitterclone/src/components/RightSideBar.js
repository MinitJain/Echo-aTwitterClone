import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
import toast from "react-hot-toast";

const RightSideBar = ({ otherUsers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const handleFollowToggle = async (userToFollowId) => {
    try {
      const isFollowing = user.following.includes(userToFollowId);
      const endpoint = isFollowing ? "unfollow" : "follow";

      const res = await axios.post(
        `${USER_API_END_POINT}/${endpoint}/${userToFollowId}`,
        { id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(followingUpdate(userToFollowId));
        dispatch(getRefresh());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("Follow/Unfollow error:", error);
    }
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter users based on search query
    if (query.trim()) {
      const filtered = otherUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="w-[25%] mt-4 px-4">
      {/* Search Box */}
      <div className="relative">
        <CiSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          size={20}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search users..."
          className="w-full py-3 pl-10 pr-4 bg-gray-100 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
        />
      </div>

      {/* Search Results */}
      {searchQuery && searchResults.length > 0 && (
        <div className="mt-2 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Search Results</h2>
          {searchResults.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-[1fr_auto] items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="flex items-center min-w-0">
                <Avatar name={user.name} size="40" round={true} />
                <div className="ml-2 overflow-hidden">
                  <h1 className="font-semibold truncate">{user.name}</h1>
                  <p className="text-sm text-gray-500 truncate">
                    @{user.username}
                  </p>
                </div>
              </div>
              <Link to={`/profile/${user?._id}`}>
                <button className="bg-blue-500 min-w-[80px] px-4 py-1.5 text-white text-sm font-semibold rounded-full hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 active:scale-95">
                  View
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Suggested for You section */}
      <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold mb-4">Suggested for You</h1>
        {otherUsers && otherUsers.length > 0 ? (
          otherUsers.map((otherUser) => (
            <div
              key={otherUser._id}
              className="grid grid-cols-[1fr_auto] items-center p-3 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-100 last:border-b-0"
            >
              <Link
                to={`/profile/${otherUser?._id}`}
                className="flex items-center min-w-0"
              >
                <Avatar
                  name={otherUser.name}
                  size="45"
                  round={true}
                  className="border-2 border-white shadow-sm"
                />
                <div className="ml-3 overflow-hidden">
                  <h1 className="font-semibold text-gray-900 truncate">
                    {otherUser.name}
                  </h1>
                  <p className="text-sm text-gray-500 truncate">
                    @{otherUser.username}
                  </p>
                </div>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFollowToggle(otherUser._id);
                }}
                className={`min-w-[100px] px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 active:scale-95 hover:shadow-md ${
                  user.following.includes(otherUser._id)
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {user.following.includes(otherUser._id)
                  ? "Following"
                  : "Follow"}
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
