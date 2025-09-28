import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";

const Feed = () => {
  const { tweets } = useSelector((store) => store.tweet);
  return (
    <div className="w-[45%] min-w-[500px]">
      <div>
        <CreatePost />
        {Array.isArray(tweets) && tweets.length > 0 ? (
          tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
        ) : (
          <p className="text-center text-gray-500">No tweets found</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
