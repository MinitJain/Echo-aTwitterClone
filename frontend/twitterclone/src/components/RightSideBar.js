import React from "react";
import { CiSearch } from "react-icons/ci";
import RSProfileBar from "./RSProfileBar";

const RightSideBar = () => {
  return (
    <div className="w-[25%] mt-4">
      <div className="flex text-gray-600 outline-none items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 w-full cursor-pointer">
        <CiSearch size={20} className="text-gray-600" />
        <input
          type="text"
          placeholder="Search Echo"
          className="bg-transparent outline-none px-2"
        />
      </div>
      <RSProfileBar />
      <RSProfileBar />
      <RSProfileBar />
    </div>
  );
};

export default RightSideBar;
