import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSideBar = ({ otherUsers }) => {
  return (
    <div className="w-[25%] mt-4">
      searchbar
      <div className="my-4 p-4 bg-gray-100 rounded-2xl">
        <h1 className="text-xl font-bold mb-4">Who to follow</h1>
        {otherUsers && otherUsers.length > 0 ? (
          otherUsers?.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <div className="flex items-center">
                <Avatar name={user.name} size="40" round={true} />
                <div className="ml-2">
                  <h1 className="font-semibold">{user.name}</h1>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
              <Link to={`/profile/${user?._id}`}>
                <button className="bg-black min-w-[80px] px-4 py-1.5 text-white text-sm font-semibold rounded-full hover:bg-gray-900 active:bg-gray-800 transition-all duration-200 active:scale-95 hover:shadow-md">
                  Profile
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
