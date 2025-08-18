import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSideBar from "./RightSideBar";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import useGetProfile from "../Hooks/useGetProfile";

const Home = () => {
  //custom hooks
  const id = "9tn5n1j59";
  useGetProfile(id);

  return (
    <div className="Home  flex justify-between max-w-7xl w-[90%] mx-auto ">
      <LeftSidebar />
      <Outlet />
      <RightSideBar />
    </div>
  );
};

export default Home;
