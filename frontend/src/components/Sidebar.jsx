import { Avatar, Sidebar, Badge, Popover } from "flowbite-react";
import {
  HiArrowSmRight,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMessage } from "react-icons/ai";

import {
  IoHomeOutline,
  IoSearchSharp,
  IoReorderThreeSharp,
} from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { MdOutlineExplore } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CreatePostBox } from "./CreatePostBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authUser,
  getUserProfile,
  suggestedUsers,
} from "../redux/user/userSlice";
import { getPosts } from "../redux/post/postSlice";
import { useNavigate } from "react-router-dom";
import CustomToast from "./CustomToast";
import { setSelectedUser } from "../redux/chat/chatSlice";
import { markAllNotificationsAsSeen } from "../redux/notification/rtnSlice"; // Import the new action

export function SideBar() {
  const [openModal, setOpenModal] = useState(false);
  const CreatePostHandler = () => {
    setOpenModal(true);
  };
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { likeNotifications } = useSelector((state) => state.rtn);
  const { messageNotifications } = useSelector((state) => state.rtn);
  const { followNotifications } = useSelector((state) => state.rtn);
  const unseenNotifications = likeNotifications.filter(
    (notification) => !notification.seen
  );
  const unSeenMsgNotifications = messageNotifications.filter(
    (notification) => !notification.seen
  );
  const unSeenFollowNotifications = followNotifications.filter(
    (notification) => !notification.seen
  );
  console.log(unSeenFollowNotifications, "dkkkkkkkk");
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
    <>
      <Sidebar className="min-h-screen border-r-2">
        <Sidebar.Logo href="#">Instagram</Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-3">
            <Sidebar.Item as={Link} to="/" icon={IoHomeOutline}>
              Home
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/search" icon={IoSearchSharp}>
              Search
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/explore" icon={MdOutlineExplore}>
              Explore
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/reels" icon={HiUser}>
              Reels
            </Sidebar.Item>
            <div className="relative">
              <Sidebar.Item as={Link} to="/messages" icon={AiOutlineMessage}>
                Messages
              </Sidebar.Item>
              {unSeenMsgNotifications.length > 0 && (
                <span className="absolute top-3 left-[-5px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {unSeenMsgNotifications.length}
                </span>
              )}
            </div>
            <Popover
              content={
                <div className="p-3 bg-white rounded-lg shadow-lg">
                  <ul>
                    {unseenNotifications.length ||
                    unSeenFollowNotifications.length > 0 ? (
                      [
                        ...unseenNotifications,
                        ...unSeenFollowNotifications,
                      ].map((notification, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 mb-2 flex items-center"
                        >
                          <Avatar
                            img={
                              notification.userDetails?.profilePicture ||
                              notification.userProfile
                            }
                            alt={`${
                              notification.userDetails?.username ||
                              notification.username
                            } profile`}
                            className="w-8 h-8 rounded-full mr-2"
                            rounded
                          />
                          <div className="flex-1">
                            <span className="font-bold">
                              {notification?.userDetails?.username ||
                                notification.username}
                            </span>{" "}
                            {notification.username && (
                              <span>started following you</span>
                            )}
                            {notification.type === "like" && (
                              <span>{notification.message}</span>
                            )}
                          </div>
                          {notification?.post?.image &&
                            notification.type === "like" && (
                              <img
                                src={notification?.post?.image}
                                alt={`${notification.post.caption}`}
                                className="w-12 h-12 rounded-lg ml-2 object-cover"
                              />
                            )}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-700">
                        No notifications
                      </li>
                    )}
                  </ul>
                </div>
              }
              trigger="hover"
              placement="top"
              onClick={() => dispatch(markAllNotificationsAsSeen())}
            >
              <div className="relative">
                <Sidebar.Item icon={FaRegHeart} as={Link} to="/notifications">
                  Notifications
                </Sidebar.Item>
                {(unseenNotifications.length > 0 ||
                  unSeenFollowNotifications.length > 0) && (
                  <span className="absolute top-3 left-[-5px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {unseenNotifications.length +
                      unSeenFollowNotifications.length}
                  </span>
                )}
              </div>
            </Popover>

            <div onClick={CreatePostHandler}>
              <Sidebar.Item icon={FaRegSquarePlus}>Create</Sidebar.Item>
            </div>

            <Sidebar.Item as={Link} to="/profile" icon={CgProfile}>
              Profile
            </Sidebar.Item>
            <div onClick={logoutHandler} className="cursor-pointer">
              <Sidebar.Item icon={RiLogoutCircleRLine}>Logout</Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <CreatePostBox openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
