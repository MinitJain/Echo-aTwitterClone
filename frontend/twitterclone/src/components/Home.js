import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSideBar from "./RightSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../Hooks/useOtherUsers";
import { useSelector } from "react-redux";
import useGetTweets from "../Hooks/useGetTweets";

const Home = () => {
  const navigate = useNavigate();
  const { user, otherUsers } = useSelector((store) => store.user);

  //custom hooks
  useOtherUsers(user?._id);
  useGetTweets(user?._id);
  console.log("Redux otherUsers:", otherUsers);

  return (
    <div className="Home flex justify-between max-w-7xl w-[100%] mx-auto ">
      <LeftSidebar />
      <Outlet />
      <RightSideBar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
