import { Avatar } from "flowbite-react";
import React from "react";
import { Account } from "./Account";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const { currentUser, suggestedUsers } = useSelector((state) => state.user);
  return (
    <>
      <Link to={`/profile/${currentUser?.user?._id}`}>
        <div className="flex justify-between items-center group cursor-pointer">
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
          {/* 
        <div className="absolute  z-10 top-5 mt-[60px] hidden group-hover:block bg-white border rounded shadow-lg p-4">
          <Account />
        </div> */}
        </div>
      </Link>
      <hr className="my-2" />
      <div>
        <h2 className="font-medium text-gray-800 dark:text-gray-200">
          Suggested users
        </h2>
        <div className="">
          {suggestedUsers.map((user) => (
            <Link to={`/profile/${user._id}`} key={user._id}>
              <div className="flex justify-between items-center group relative my-3 cursor-pointer">
                <div className="flex gap-3">
                  <Avatar
                    placeholderInitials="CN"
                    img={user?.profilePicture}
                    className="object-cover"
                    rounded
                  />
                  <div className="font-medium dark:text-white">
                    <h1>{user?.username}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.bio || "Bio..."}
                    </p>
                  </div>
                </div>
                <div className=" text-blue-500 font-medium">Follow</div>

                {/* <div className="absolute  z-10 top-3 mt-[33px] hidden group-hover:block bg-white border rounded shadow-lg p-4">
                <Account />
              </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
