import { Avatar } from "flowbite-react";
import React from "react";
import { Account } from "./Account";
import { useSelector } from "react-redux";

const RightSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex justify-between items-center group">
      <div className="flex gap-3">
        <Avatar
          placeholderInitials="CN"
          img={currentUser?.user?.profilePicture}
          className="object-cover"
          rounded
        />
        <div className="font-medium dark:text-white">
          <h1>{currentUser?.user?.username}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentUser?.user?.bio}
          </p>
        </div>
      </div>
      <div className=" text-blue-500 font-medium">Switch</div>

      <div className="absolute top-5 mt-[60px] hidden group-hover:block bg-white border rounded shadow-lg p-4">
        <Account />
      </div>
    </div>
  );
};

export default RightSidebar;
