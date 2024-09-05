import React from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import {
  authUser,
  getUserProfile,
  suggestedUsers,
} from "../redux/user/userSlice";
import { getPosts } from "../redux/post/postSlice";
import { setSelectedUser } from "../redux/chat/chatSlice";
import CustomToast from "../components/CustomToast";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const navigation = useNavigate();

  const logoutHandler = async () => {
    const res = await fetch("/api/user/logout");
    const data = await res.json();
    if (data.success) {
      dispatch(authUser(null));
      dispatch(getPosts([]));
      dispatch(suggestedUsers([]));
      dispatch(getUserProfile(null));
      dispatch(setSelectedUser(null));

      CustomToast(data.message);
      navigation("/sign-in");
    }
  };
  return (
    <div className=" w-full h-screen p-5 flex flex-col items-center ">
      <h1 className="my-3 ">Settings</h1>
      <div className="w-full flex justify-between items-center p-5 bg-slate-200 dark:bg-slate-500 rounded-md">
        <h2 className="dark:text-black">Theme</h2>
        <Button
          className="w-12 h-10 "
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
      </div>
      <div className=" p-5">
        <Button onClick={logoutHandler} className="cursor-pointer">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Settings;
