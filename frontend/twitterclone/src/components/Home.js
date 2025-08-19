import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSideBar from "./RightSideBar";
import { Outlet } from "react-router-dom";
import useOtherUsers from "../Hooks/useOtherUsers";
import { useSelector } from "react-redux";
import useGetTweets from "../Hooks/useGetTweets";

const Home = () => {
  const { user, otherUsers } = useSelector((store) => store.user);
  useOtherUsers(user?._id);
  //custom hooks
  useGetTweets(user?._id);
  console.log("Redux otherUsers:", otherUsers);

  return (
    <div className="Home  flex justify-between max-w-7xl w-[90%] mx-auto ">
      <LeftSidebar />
      <Outlet />
      <RightSideBar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
