import React, { useEffect, useState } from "react";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";
import CopilotHelper from "./components/CopilotHelper";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/userSlice";
import API from "./api/axios";
import Login from "./components/Login";

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get user ID from localStorage (stored during login)
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          if (parsedUser?.id) {
            // Verify the cookie is still valid by fetching profile
            const response = await API.get(
              `/api/v1/user/profile/${parsedUser.id}`
            );

            if (response.data.success) {
              // Cookie is valid, restore user to Redux
              dispatch(getUser(response.data.user));
              console.log("Auth check passed, user restored");
            }
          }
        } else {
          console.log("No stored user, will show login");
        }
      } catch (error) {
        // Cookie invalid, expired, or backend error
        console.log("Auth check failed:", error.message);
        localStorage.removeItem("user");
        // This is fine - user will see login page
      } finally {
        setIsInitialized(true);
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Show loading screen while checking auth
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
    <div className="App">
      {/* If no user, show login. Otherwise show main app */}
      {!user ? <Login /> : <Body />}
      <Toaster />
      <CopilotHelper />
    </div>
  );
}

export default App;
