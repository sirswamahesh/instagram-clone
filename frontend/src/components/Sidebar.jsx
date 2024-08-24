import { Avatar, Sidebar } from "flowbite-react";
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
export function SideBar() {
  const [openModal, setOpenModal] = useState(false);
  const CreatePostHandler = () => {
    setOpenModal(true);
  };
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const logoutHandler = async () => {
    const res = await fetch("/api/user/logout");
    const data = await res.json();
    if (data.success) {
      dispatch(authUser(null));
      dispatch(getPosts([]));
      dispatch(suggestedUsers([]));
      dispatch(getUserProfile(null));
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
            <Sidebar.Item as={Link} to="/messages" icon={AiOutlineMessage}>
              Messages
            </Sidebar.Item>
            <Sidebar.Item icon={FaRegHeart} as={Link} to="/notifications">
              Notifications
            </Sidebar.Item>
            <div onClick={CreatePostHandler}>
              <Sidebar.Item icon={FaRegSquarePlus}>Create</Sidebar.Item>
            </div>

            <Sidebar.Item as={Link} to="/profile" icon={CgProfile}>
              Profile
            </Sidebar.Item>
            <div onClick={logoutHandler} className=" cursor-pointer">
              <Sidebar.Item icon={RiLogoutCircleRLine}>Logout</Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <CreatePostBox openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
