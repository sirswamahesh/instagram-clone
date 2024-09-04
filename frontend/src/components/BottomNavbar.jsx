import React from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoHomeOutline, IoSearch, IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const BottomNavbar = () => {
  return (
    <div className="fixed md:hidden z-50 w-full h-12 bg-black border border-gray-200 bottom-0  dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <div className="flex justify-center items-center">
          <Link to="/">
            <IoHomeOutline color="white" size={23} />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <IoSearch color="white" size={23} />
        </div>
        <div className="flex justify-center items-center">
          <FaRegSquarePlus color="white" size={23} />
        </div>
        <div className="flex justify-center items-center">
          <Link to="/messages">
            <AiOutlineMessage color="white" size={23} />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <CgProfile color="white" size={23} />
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
