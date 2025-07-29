import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSideBar from "./RightSideBar";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home flex justify-between max-w-7xl w-[90%] mx-auto">
      <LeftSidebar />
      <Outlet />
      <RightSideBar />
    </div>
  );
};

export default Home;
