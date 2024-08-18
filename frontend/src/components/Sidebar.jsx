import { Sidebar } from "flowbite-react";
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
import { MdOutlineExplore } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CreatePostBox } from "./CreatePostBox";
import { useState } from "react";

export function SideBar() {
  const [openModal, setOpenModal] = useState(false);
  const CreatePostHandler = () => {
    setOpenModal(true);
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

            <Sidebar.Item as={Link} to="/setting" icon={IoReorderThreeSharp}>
              More
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <CreatePostBox openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
