import { Avatar, Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { authUser, getUserProfile } from "../redux/user/userSlice";
import CustomToast from "./CustomToast";
import { IoIosArrowDown } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import SaveIcon from "../icons/save";

const UserProfile = () => {
  const { userProfile, currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("posts");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const handleTabChange = (tab) => {
    setTab(tab);
  };

  const renderPosts =
    tab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  const user = currentUser?.user?.id === userProfile?.id;

  const isFollowing = currentUser.user.following.includes(userProfile?.id);
  const isFollower = currentUser.user.followers.includes(userProfile?.id);
  const handleFollowToggle = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/followOrUnfollow/${userProfile.id}`);
      const data = await res.json();
      if (res.ok) {
        CustomToast(data.message);
        dispatch(
          authUser({
            ...currentUser,
            user: {
              ...currentUser.user,
              following: isFollowing
                ? currentUser.user.following.filter(
                    (id) => id !== userProfile?.id
                  )
                : [...currentUser.user.following, userProfile?.id],
            },
          })
        );
        dispatch(
          getUserProfile({
            ...userProfile,
            followers: isFollowing
              ? userProfile.followers.filter((id) => id !== currentUser.user.id)
              : [...userProfile.followers, currentUser.user.id],
          })
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="min-h-screen w-full p-4">
      <div className="flex justify-between sm:hidden">
        <div className="flex items-center gap-1">
          {userProfile?.username}
          <IoIosArrowDown />
        </div>
        <Link to="/settings">
          <IoSettingsOutline size={20} />
        </Link>
      </div>
      <hr className="mb-2 mt-1" />
      <div className="sm:flex items-start flex-col sm:flex-row gap-14 sm:justify-center justify-start">
        <div className="flex gap-5 items-start ">
          <Avatar
            placeholderInitials="CN"
            className="object-cover text-3xl"
            img={userProfile?.profilePicture}
            rounded
            alt="Profile Picture"
            size={isMobile ? "lg" : "xl"}
            shadow="md"
          />
          <div className=" flex sm:hidden gap-4 sm:gap-10 mt-5 ">
            <p className="flex flex-col items-center sm:flex">
              <span className="font-semibold">
                {userProfile?.posts?.length}{" "}
              </span>
              Posts
            </p>
            <p className="flex flex-col items-center sm:flex">
              <span className="font-semibold">
                {userProfile?.followers?.length}{" "}
              </span>
              Followers
            </p>
            <p className="flex flex-col items-center sm:flex">
              <span className="font-semibold">
                {userProfile?.following?.length}
              </span>
              Following
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="sm:flex flex-col sm:flex-row gap-5 items-center ">
            <h1 className="text-2xl font-bold dark:text-white">
              {userProfile?.username}
            </h1>
            <div className="sm:hidden">{userProfile?.bio}</div>
            <div className="flex gap-5 sm:gap-5 mt-3 items-center">
              {user ? (
                <>
                  <Link to="/edit-profile">
                    <Button size="sm" color="light" className="px-5">
                      Edit Profile
                    </Button>
                  </Link>
                  <Button size="sm" color="light" className="px-5">
                    Share profile
                  </Button>
                  <Link to="/settings" className="hidden sm:inline">
                    <IoSettingsOutline size={20} />
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    color="light"
                    onClick={handleFollowToggle}
                    style={{
                      boxShadow: "none",
                    }}
                    className="hover:shadow-none"
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : isFollowing ? (
                      "Following"
                    ) : isFollower ? (
                      "Follow back"
                    ) : (
                      "Follow"
                    )}
                  </Button>
                  <BsThreeDots size={30} />
                </>
              )}
            </div>
          </div>
          <div className="sm:flex gap-10 hidden sm:mt-3">
            <p className="flex flex-col sm:flex sm:flex-row sm:gap-2">
              <span className="font-semibold">
                {userProfile?.posts?.length}{" "}
              </span>
              Posts
            </p>
            <p className="flex flex-col sm:flex sm:flex-row sm:gap-2">
              <span className="font-semibold">
                {userProfile?.followers?.length}{" "}
              </span>
              Followers
            </p>
            <p className="flex flex-col sm:flex sm:flex-row sm:gap-2">
              <span className="font-semibold">
                {userProfile?.following?.length}{" "}
              </span>
              Following
            </p>
          </div>
          <div className="hidden sm:inline">{userProfile?.bio}</div>
        </div>
      </div>
      <hr className="m-1 mt-5 sm:m-10 bg-slate-950 " />
      <div className="flex justify-center items-center flex-col">
        <div className="flex gap-20 sm:gap-40 mb-3 text-[15px]">
          <p
            className={`${
              tab === "posts" && "font-semibold"
            } flex items-center gap-1`}
            onClick={() => handleTabChange("posts")}
          >
            <span>POSTS</span>
          </p>
          {user && (
            <p
              className={`${
                tab === "saved" && "font-semibold"
              } flex items-center gap-1`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </p>
          )}

          <p className="hidden sm:inline">TAGGED</p>
        </div>
        {renderPosts?.length === 0 ? (
          <p className="text-gray-500 text-lg">No posts available</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {renderPosts?.map((post) => {
              return (
                <div
                  key={post?.id}
                  className="relative h-[150px] w-[150px] sm:h-[300px] sm:w-[300px] border group"
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
