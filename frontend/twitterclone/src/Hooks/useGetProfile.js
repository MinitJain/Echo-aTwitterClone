import { useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        console.log("Fetched profile from API:", res.data.user);
        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.log("Failed to fetch profile, Error: ", error);
      }
    };

    if (id) fetchProfile();
  }, [id, dispatch]);
};

export default useGetProfile;
