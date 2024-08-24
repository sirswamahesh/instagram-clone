import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../components/UserProfile";
const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const getProfile = async () => {
      const res = await fetch(`/api/user/${id}/profile`);
      const data = await res.json();
      if (res.ok) {
        dispatch(getUserProfile(data.user));
      } else {
        throw new Error("Failed to fetch user profile");
      }
    };
    getProfile();
  }, [id]);
  return <UserProfile />;
};

export default Profile;
