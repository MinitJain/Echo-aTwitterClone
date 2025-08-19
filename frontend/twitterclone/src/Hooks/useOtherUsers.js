import { useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";

const useOtherUsers = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/otherusers/${id}`, {
          withCredentials: true,
        });

        // Log the full response to see actual structure
        console.log("Full Other Users Response:", res.data);

        const users = res.data.otherUsers;

        dispatch(getOtherUsers(res.data.OtherUser));
      } catch (error) {
        console.log("Failed to fetch other users Error: ", error);
      }
    };

    fetchOtherUsers();
  }, []);
};

export default useOtherUsers;
