// App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/userSlice";
import API from "./api/axios";
import Body from "./components/Body";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import CopilotHelper from "./components/CopilotHelper";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          if (parsedUser?.id) {
            const response = await API.get(
              `/api/v1/user/profile/${parsedUser.id}`
            );

            if (response.data.success) {
              dispatch(getUser(response.data.user));
              console.log("Auth check passed, user restored");
            }
          }
        }
      } catch (error) {
        console.log("Auth check failed:", error.message);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* If user is logged in, redirect /login to main app */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        {/* Protected main app route */}
        <Route path="/*" element={user ? <Body /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
      <CopilotHelper />
      <Analytics />
    </>
  );
}

export default App;
