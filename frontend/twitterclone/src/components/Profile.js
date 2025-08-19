import Avatar from "react-avatar";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetProfile from "../Hooks/useGetProfile";

const Profile = () => {
  const { id } = useParams(); // URL param (if any)
  const { user, profile } = useSelector((store) => store.user);

  // If there's an `id` in the URL, show that profile; else show logged-in user's profile
  const userId = id || user?._id;

  // Debug
  console.log("Profile route ID:", id);
  console.log("Using userId:", userId);

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
    <div className="w-[50%] border-l border-r border-gray-200">
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
            <p className="text-gray-500 text-md">10 posts</p>
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
            <Avatar name={profile?.name} size="100" round={true} />
          </div>

          {/* Only show Edit Profile if it's your own profile */}
          {!id && (
            <div className="absolute top-52 right-2">
              <button className="px-4 py-1.5 font-semibold border-2 border-gray-400 rounded-full hover:bg-zinc-200">
                Edit Profile
              </button>
            </div>
          )}

          <div className="mt-16 px-4">
            <h1 className="text-xl font-bold">{profile?.name}</h1>
            <p className="text-gray-500">@{profile?.username}</p>
            <div className="mt-4">
              <p className="text-gray-800 text-sm">
                🌐 Full Stack Developer | MERN Stack Enthusiast | DSA IN C++ |
                SQL | Open Source Contributor | Tech Blogger | Passionate about
                building scalable web applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
