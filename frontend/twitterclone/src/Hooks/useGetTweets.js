import { useEffect } from "react";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);

  useEffect(() => {
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

    fetchTweets(); // ✅ always run
  }, [refresh]);
};

export default useGetTweets;
