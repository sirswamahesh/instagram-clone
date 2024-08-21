import { Avatar, TextInput, Toast } from "flowbite-react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBorderNone, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import SaveIcon from "../icons/save";
import { DialogBox } from "./DialogBox";
import { IoMdHeart } from "react-icons/io";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/post/postSlice";
import { toast } from "react-toastify";
const Post = ({ post }) => {
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [liked, setLiked] = useState(
    post.likes.includes(currentUser.user._id) || false
  );

  const LikeOrDisLikeHandler = async (postId) => {
    const action = liked ? "dislike" : "like";

    try {
      const res = await fetch(`/api/post/${postId}/${action}`);
      if (res.ok) {
        const data = await res.json();
        setLiked(!liked);

        // Update the post in the Redux state
        const updatedPostData = posts.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== currentUser.user._id)
                  : [...p.likes, currentUser.user._id],
              }
            : p
        );
        dispatch(getPosts(updatedPostData));
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-[450px] mx-auto border-b-[1px] mb-4">
      <div className="flex justify-between mb-3">
        <div className="flex gap-3">
          <Avatar
            placeholderInitials="CN"
            className="object-cover"
            img={post?.author?.profilePicture}
            rounded
          />
          <div className="font-medium dark:text-white">
            <div className="flex items-center gap-2">
              <h1>{post?.author?.username}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2014
            </p>
          </div>
        </div>
        <div>
          <BsThreeDots className="text-xl" onClick={() => setOpenModal(true)} />
          {openModal && (
            <DialogBox
              openModal={openModal}
              setOpenModal={setOpenModal}
              post={post}
            />
          )}
        </div>
      </div>
      <div>
        <img src={post.image} className="rounded" />
      </div>
      <div className="flex justify-between my-4">
        <div className="flex justify-between gap-3">
          {liked ? (
            <IoMdHeart
              className="text-[25px]"
              color="red"
              onClick={() => LikeOrDisLikeHandler(post._id)}
            />
          ) : (
            <FaRegHeart
              className="text-[25px]"
              onClick={() => LikeOrDisLikeHandler(post._id)}
            />
          )}

          <FaRegComment className="text-[25px]" />
          <TbLocationShare className="text-[25px]" />
        </div>
        <div>
          <SaveIcon />
        </div>
      </div>
      <div>{post.likes.length} Likes</div>
      <div className="flex items-center ">
        <h1>{post?.author?.username}</h1>
        <p className="ml-2 text-[14px]">{post.caption}</p>
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
