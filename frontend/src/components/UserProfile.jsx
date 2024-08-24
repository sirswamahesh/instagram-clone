import { Avatar, Button } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { userProfile, currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("posts");

  const handleTabChange = (tab) => {
    setTab(tab);
  };

  const renderPosts =
    tab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  const user = currentUser?.user?._id === userProfile?._id;
  return (
    <div className="min-h-screen w-full p-4">
      <div className="flex items-start gap-14 justify-center">
        <div>
          <Avatar
            placeholderInitials="CN"
            className="object-cover text-3xl"
            img={userProfile?.profilePicture}
            rounded
            alt="Profile Picture"
            size="xl"
            shadow="md"
          />
        </div>

        <div className="flex flex-col gap-7">
          <div className="flex gap-5 items-center">
            <h1 className="text-2xl font-bold dark:text-white">
              {userProfile?.username}
            </h1>
            {user ? (
              <>
                <Link to="/edit-profile">
                  <Button size="sm" color="light">
                    Edit Profile
                  </Button>
                </Link>
                <Button size="sm" color="light">
                  View archive
                </Button>
                <IoSettingsOutline size={30} />
              </>
            ) : (
              <>
                {" "}
                <Button className="bg-slate-400 text-slate-200">Follow</Button>
                <BsThreeDots size={30} />
              </>
            )}
          </div>
          <div className="flex gap-10">
            <p>
              <span className="font-semibold">
                {userProfile?.posts?.length}{" "}
              </span>
              Posts
            </p>
            <p>
              <span className="font-semibold">
                {userProfile?.followers?.length}{" "}
              </span>
              Followers
            </p>
            <p>
              <span className="font-semibold">
                {userProfile?.following?.length}{" "}
              </span>
              Following
            </p>
          </div>
          <div>{userProfile?.bio}</div>
        </div>
      </div>
      <hr className="m-10" />
      <div className="flex justify-center items-center flex-col">
        <div className="flex gap-40 mb-5">
          <p
            className={tab === "posts" ? "font-semibold" : ""}
            onClick={() => handleTabChange("posts")}
          >
            POSTS
          </p>
          <p
            className={tab === "saved" ? "font-semibold" : ""}
            onClick={() => handleTabChange("saved")}
          >
            SAVED
          </p>
          <p>TAGGED</p>
        </div>
        {renderPosts?.length === 0 ? (
          <p className="text-gray-500 text-lg">No posts available</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {renderPosts?.map((post) => (
              <div
                key={post?._id}
                className="relative h-[300px] w-[300px] border group"
              >
                <img
                  src={post?.image}
                  alt="Post"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center flex gap-3">
                    <p className="flex items-center">
                      <span className="text-[20px] mr-1">
                        {post?.likes?.length}
                      </span>
                      <FaRegHeart size={20} />
                    </p>
                    <p className="flex items-center">
                      <span className="text-[20px] mr-1">
                        {post?.comments?.length}
                      </span>
                      <LuMessageCircle size={23} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
