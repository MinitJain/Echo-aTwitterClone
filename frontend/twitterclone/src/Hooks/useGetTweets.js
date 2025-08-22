import { useEffect } from "react";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
import toast from "react-hot-toast";

const useGetTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);
  // const { User } = useSelector((store) => store.user);

  const fetchTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweets`, {
        withCredentials: true,
      });
      console.log("Fetched All Tweets from API:", res.data.tweets);
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log("Failed to fetch profile, All Tweets: ", error);
    }
  };

  const followingTweetHandler = async () => {
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweets/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res);
        dispatch(getAllTweets(res.data.tweets));
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch following user's tweet  tweets"
      );
    }
  };

  useEffect(() => {
    fetchTweets();
    followingTweetHandler(); // ✅ always run
  }, [refresh]);
};

export default useGetTweets;
