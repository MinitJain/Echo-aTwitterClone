import React from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";

const CreatePost = () => {
  return (
    <div className="w-[100%] ">
      <div className="">
        <div className="flex justify-evenly  items-center border-b border-gray-200 ">
          <div className="cursor-pointer w-full text-center px-4 py-3 hover:bg-gray-100 p-2 rounded-lg">
            <h1 className="font-semibold text-gray-600 text-lg ">For You</h1>
          </div>
          <div className="cursor-pointer w-full text-center hover:bg-gray-100 p-2 rounded-lg">
            <h1 className="font-semibold text-gray-600 text-lg ">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex m-4">
            <Avatar src="" name="Wim Mostmans" size="40" />
            <input
              className="w-full p-2 outline-none border-none text-lg"
              type="text"
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex p-4 justify-between items-center border-b border-gray-300">
            <div>
              <CiImageOn size={"24px"} />
            </div>
            <button className="px-4 py-2 font-bold border-none text-lg bg-[#1D9BF0] text-white rounded-full  mt-4 hover:bg-[#1A8CD8]">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
