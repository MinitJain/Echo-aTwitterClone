import { useEffect } from "react";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetTweets = (id) => {
  const dispatch = useDispatch();
  //tweet/alltweets/688ced9af9a17500b49a1dca

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
          withCredentials: true,
        });
        console.log("Fetched All Tweets from API:", res.data.tweets);
        dispatch(getAllTweets(res.data.tweets));
      } catch (error) {
        console.log("Failed to fetch profile, All Tweets: ", error);
      }
    };

    if (id) fetchTweets();
  }, [id]);
};

export default useGetTweets;
