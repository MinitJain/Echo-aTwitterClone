import { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const useGetProfile = (id) => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
      } catch (error) {
        console.log("Failed to fetch profile, Error: ", error);
      }
    };

    if (id) fetchProfile(); // only fetch if we actually have an id
  }, []);
};

export default useGetProfile;
