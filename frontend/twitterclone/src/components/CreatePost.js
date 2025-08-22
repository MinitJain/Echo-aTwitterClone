import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getRefresh } from "../redux/tweetSlice";
import { follow } from "../../../../backend/controllers/userController";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
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

  return (
    <div className="w-[100%] border border-l border-r border-gray-100 ">
      <div className="">
        <div className="flex justify-evenly  items-center border-b ">
          <div
            onClick={forYouHandler}
            className="cursor-pointer w-full text-center px-4 py-3 hover:bg-gray-100 p-2 rounded-lg"
          >
            <h1 className="font-semibold text-gray-600 text-lg ">For You</h1>
          </div>
          <div
            onClick={followingHandler}
            className="cursor-pointer w-full text-center hover:bg-gray-100 p-2 rounded-lg"
          >
            <h1 className="font-semibold text-gray-600 text-lg ">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex m-4">
            <Avatar src="" name="Wim Mostmans" size="40" />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitHandler()}
              className="w-full p-2 outline-none border-none text-lg"
              type="text"
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex p-4 justify-between items-center border-b border-gray-300">
            <div>
              <CiImageOn size={"24px"} />
            </div>
            <button
              onClick={submitHandler}
              disabled={loading}
              className={`px-4 py-2 font-bold border-none text-lg rounded-full mt-4 
                  ${
                    loading ? "bg-gray-400" : "bg-[#1D9BF0] hover:bg-[#1A8CD8]"
                  } text-white`}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
