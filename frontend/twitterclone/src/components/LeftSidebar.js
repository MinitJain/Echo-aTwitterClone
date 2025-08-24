import React from "react";
import {
  RiHome5Line,
  RiHashtag,
  RiNotification3Line,
  RiUser3Line,
  RiBookmarkLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      // First clear the local storage
      localStorage.clear();

      // Then clear Redux state
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));

      // Then make the logout request
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      // Show success message
      toast.success(res.data.message || "Logged out successfully");

      // Finally navigate (use replace to prevent going back)
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.log(error);
    }
  };

  return (
    <div className="w-[20%] ">
      <div>
        <div>
          <img
            width={"80px"}
            src="/ZoomedLogo.png"
            alt="Logo"
            className="logo mt-4 "
          />
        </div>
        <div className="my-4">
          <Link
            to="/"
            className="SideBar flex items-center my-2 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg cursor-pointer transition-all duration-200 active:scale-95"
          >
            <RiHome5Line size={24} className="group-hover:scale-110" />
            <div className="font-semibold text-lg ml-2">Home</div>
          </Link>
          <div className="SideBar flex items-center my-2 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg cursor-pointer transition-all duration-200 active:scale-95">
            <RiHashtag size={24} className="group-hover:scale-110" />
            <div className="font-semibold text-lg ml-2">Explore</div>
          </div>
          <div className="SideBar flex items-center my-2 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg cursor-pointer transition-all duration-200 active:scale-95">
            <RiNotification3Line size={24} className="group-hover:scale-110" />
            <div className="font-semibold text-lg ml-2">Notification</div>
          </div>
          {user && (
            <Link
              to={`/profile/${user._id}`}
              className="SideBar flex items-center my-2 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg cursor-pointer transition-all duration-200 active:scale-95"
            >
              <RiUser3Line size={24} className="group-hover:scale-110" />
              <div className="font-semibold text-lg ml-2">Profile</div>
            </Link>
          )}
          <div className="SideBar flex items-center my-2 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg cursor-pointer transition-all duration-200 active:scale-95">
            <RiBookmarkLine size={24} className="group-hover:scale-110" />
            <div className="font-semibold text-lg ml-2">Bookmarks</div>
          </div>
          <div
            onClick={logoutHandler}
            className="SideBar flex items-center my-2 hover:bg-gray-200 active:bg-gray-300 p-2 rounded-lg cursor-pointer transition-all duration-200 active:scale-95"
          >
            <RiLogoutBoxRLine size={24} />
            <div className="font-semibold text-lg ml-2">Logout</div>
          </div>
          <button className="px py-2 font-bold border-none text-md bg-[#1D9BF0] text-white rounded-full w-full mt-4 hover:bg-[#1A8CD8]">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
