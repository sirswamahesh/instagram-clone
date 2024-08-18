import { Avatar, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { BsSave, BsThreeDots } from "react-icons/bs";
import { FaBorderNone, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import SaveIcon from "../icons/save";
import { DialogBox } from "./DialogBox";

const Post = () => {
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState("");
  return (
    <div className="max-w-[500px] mx-auto border-b-[1px] mb-4">
      <div className="flex justify-between mb-3">
        <div className="flex gap-3">
          <Avatar placeholderInitials="CN" className="object-cover" rounded />
          <div className="font-medium dark:text-white">
            <h1>mahesh_sirswa</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2014
            </p>
          </div>
        </div>
        <div>
          <BsThreeDots className="text-xl" onClick={() => setOpenModal(true)} />
          {openModal && (
            <DialogBox openModal={openModal} setOpenModal={setOpenModal} />
          )}
        </div>
      </div>
      <div>
        <img
          src="https://images2.privateschoolreview.com/photo/7000/7200/IMG_Academy-8a1hvhmu19c08swgk4skw8sg4-1122.jpg"
          className="rounded"
        />
      </div>
      <div className="flex justify-between my-4">
        <div className="flex justify-between gap-3">
          <FaRegHeart className="text-[25px]" />
          <FaRegComment className="text-[25px]" />
          <TbLocationShare className="text-[25px]" />
        </div>
        <div>
          <SaveIcon />
        </div>
      </div>
      <div>1 Likes</div>
      <div className="flex items-center">
        <h1>Username</h1>
        <span className="ml-2 text-[14px]">
          जब कोई भगवान से निश्छल प्रेम करता है तो भगवान उसके लिए पक्षपाती हो
          जाते हैं।
        </span>
      </div>
      <div className="text-sm my-1 text-gray-500 dark:text-gray-400">
        View all 372 comments
      </div>
      <div className="relative mt-3">
        <input
          placeholder="Add a comment..."
          className="border-0 focus:outline-none focus:border-none w-full pr-12"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          onFocus={FaBorderNone}
        />
        {comment.length > 0 && (
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 font-medium">
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
