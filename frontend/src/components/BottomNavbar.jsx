import { Avatar } from "flowbite-react";
import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoHomeOutline, IoSearch, IoSearchSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CreatePostBox } from "./CreatePostBox";
const BottomNavbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const CreatePostHandler = () => {
    setOpenModal(true);
  };
  return (
    <>
      {" "}
      <div className="fixed md:hidden z-50 w-full h-12 bg-black border border-gray-200 bottom-0  dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <div className="flex justify-center items-center">
            <Link to="/">
              <IoHomeOutline color="white" size={25} />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <IoSearch color="white" size={25} />
          </div>
          <div
            className="flex justify-center items-center"
            onClick={CreatePostHandler}
          >
            <FaRegSquarePlus color="white" size={25} />
          </div>
          <div className="flex justify-center items-center">
            <Link to="/messages">
              <AiOutlineMessage color="white" size={25} />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link to={`/profile/${currentUser?.user?.id}`}>
              <Avatar
                className="object-cover"
                img={currentUser?.user?.profilePicture}
                rounded
                size={"sm"}
              />
            </Link>
          </div>
        </div>
      </div>
      <CreatePostBox openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default BottomNavbar;
