import React from "react";
import Avatar from "react-avatar";
import { RiChat1Line, RiHeart3Line, RiBookmarkLine } from "react-icons/ri";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex  p-4 border-b border-gray-200">
          <Avatar src="" name="User Name" size="40" />
          <div className="ml-2 w-full">
            <div className="flex items-center ml-2">
              <h1 className="font-semibold">{tweet?.userDetails?.[0]?.name}</h1>
              <p className="text-gray-500 text-sm  ml-2">
                @{tweet?.userDetails?.[0]?.username}
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm ml-2">{tweet?.description}</p>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex items-center group">
                <div className="rounded-full cursor-pointer p-2 transition-all hover:bg-blue-100 active:scale-95">
                  <RiChat1Line
                    size={20}
                    className="group-hover:text-blue-500 group-hover:scale-110"
                  />
                </div>
                <p className="text-sm ml-1 group-hover:text-blue-500">12</p>
              </div>
              <div className="flex items-center group">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="cursor-pointer p-2 rounded-full transition-all hover:bg-red-100 active:scale-95"
                >
                  <RiHeart3Line
                    size={20}
                    className="group-hover:scale-110 group-hover:text-red-500"
                  />
                </div>
                <p className="text-sm ml-1 group-hover:text-red-500">
                  {tweet?.likes?.length}
                </p>
              </div>
              <div className="flex items-center group">
                <div className="rounded-full cursor-pointer p-2 transition-all hover:bg-green-100 active:scale-95">
                  <RiBookmarkLine
                    size={20}
                    className="group-hover:text-green-500 group-hover:scale-110"
                  />
                </div>
                <p className="text-sm ml-1 group-hover:text-green-500">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
