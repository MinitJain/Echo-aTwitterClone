import Avatar from "react-avatar";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useGetProfile from "../Hooks/useGetProfile";
import API from "../api/axios";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { id } = useParams(); // URL param (if any)
  const { user, profile } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  useGetProfile(id);
  // If there's an `id` in the URL, show that profile; else show logged-in user's profile
  const userId = id || user?._id;

  const followAndUnfollowHandler = async () => {
    try {
      if (user.following.includes(id)) {
        // Unfollow
        const res = await API.post(`/api/v1/user/unfollow/${id}`, {
          id: user?._id,
        });
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        // toast.success(res.data.message || "User Unfollowed!");
      } else {
        // Follow
        const res = await API.post(`/api/v1/user/follow/${id}`, {
          id: user?._id,
        });

        // Only update the state if the follow request was successful
        if (res.data.success) {
          dispatch(followingUpdate(id));
          // toast.success(res.data.message || "User followed!");
        } else {
          // If the backend indicates failure, show the error message
          // toast.error(res.data.message || "Failed to follow user");
        }
      }
    } catch (error) {
      // Don't update the state if there's an error
      // toast.error(error.response?.data?.message || "Something went wrong!");
      console.log(error);
    }
  };

  // Fetch profile data
  useGetProfile(userId);

  // Optional loading state
  if (!profile) {
    return (
      <div className="w-[50%] border-l border-r border-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-[50%] ">
      <div>
        <div className="flex items-center my-4">
          <Link
            to="/"
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100"
          >
            <IoMdArrowBack size={24} />
          </Link>
          <div>
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            {/* <p className="text-gray-500 text-md">10 posts</p> */}
          </div>
        </div>

        <div className="relative">
          <img
            src={
              profile?.bannerUrl ||
              "https://placehold.co/600x200?text=Profile+Banner"
            }
            alt="Profile Banner"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-36 left-4">
            {profile?.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <Avatar name={profile?.name} size="100" round={true} />
            )}
          </div>

          {/* Only show Edit Profile if it's your own profile */}

          {profile?._id === user?._id ? (
            <div className="absolute top-52 right-2">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="px-4 py-1.5 font-semibold border-2 border-gray-400 rounded-full hover:bg-zinc-200"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="absolute top-52 right-2">
              <button
                onClick={followAndUnfollowHandler}
                className="px-4 py-1.5 bg-black font-semibold rounded-full text-white"
              >
                {user.following.includes(id) ? "Unfollow" : "Follow"}
              </button>
            </div>
          )}

          <div className="mt-16 px-4">
            <h1 className="text-xl font-bold">{profile?.name}</h1>
            <p className="text-gray-500">@{profile?.username}</p>
            <div className="mt-4">
              <p className="text-gray-800 text-sm">{profile?.bio || ""}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfile
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </div>
  );
};

export default Profile;
