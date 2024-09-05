import { Avatar, Spinner, TextInput, Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBorderNone, FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import SaveIcon from "../icons/save";
import SavedIcon from "../icons/saved";
import { DialogBox } from "./DialogBox";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, setSelectedPost } from "../redux/post/postSlice";
import CustomToast from "./CustomToast";
import CommentBox from "./CommentBox";
import { authUser } from "../redux/user/userSlice";
const Post = ({ post }) => {
  const [openModal, setOpenModal] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [liked, setLiked] = useState(
    post?.likes?.includes(currentUser?.user?.id) || false
  );
  const [saved, setSaved] = useState(
    currentUser?.user?.bookmarks.some((bookmark) => bookmark.id === post?.id) ||
      false
  );

  const [loading, setLoading] = useState(false);
  const [postComment, setPostComment] = useState([]);

  useEffect(() => {
    setPostComment(post.comments);
  }, [post]);
  const LikeOrDisLikeHandler = async (postId) => {
    const action = liked ? "dislike" : "like";

    try {
      const res = await fetch(`/api/post/${postId}/${action}`);
      if (res.ok) {
        const data = await res.json();
        setLiked(!liked);

        // Update the post in the Redux state
        const updatedPostData = posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== currentUser.user.id)
                  : [...p.likes, currentUser.user.id],
              }
            : p
        );
        dispatch(getPosts(updatedPostData));
        CustomToast(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const CommentHandler = async (postId) => {
    setLoading(true);
    const res = await fetch(`/api/post/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: comment }),
    });
    const data = await res.json();
    if (res.ok) {
      CustomToast(data.message);
      setLoading(false);
      const updatedCommentData = [...postComment, data.comment];
      setPostComment(updatedCommentData);

      const updatedPostData = posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [...p.comments, data.comment],
            }
          : p
      );
      dispatch(getPosts(updatedPostData));
      setComment("");
    }
  };

  const SaveOrUnsaveHandler = async (postId) => {
    try {
      const res = await fetch(`/api/post/${postId}/bookmark`);
      if (res.ok) {
        const data = await res.json();
        setSaved(!saved);

        console.log(saved, "current");
        const updatedBookmarks = saved
          ? currentUser.user.bookmarks.filter((post) => post.id !== postId)
          : [...currentUser.user.bookmarks, post];

        const updatedUserData = {
          ...currentUser,
          user: {
            ...currentUser.user,
            bookmarks: updatedBookmarks,
          },
        };

        dispatch(authUser(updatedUserData));

        CustomToast(data.message);
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
      <div className="w-full h-[438px]">
        <img src={post.image} className="h-full w-full object-cover rounded" />
      </div>
      <div className="flex justify-between my-4">
        <div className="flex justify-between gap-3">
          {liked ? (
            <FaHeart
              className="text-[25px]"
              color="red"
              onClick={() => LikeOrDisLikeHandler(post?.id)}
            />
          ) : (
            <FaRegHeart
              className="text-[25px]"
              onClick={() => LikeOrDisLikeHandler(post?.id)}
            />
          )}
          <div
            onClick={() => {
              dispatch(setSelectedPost(post));
              setShowCommentBox(true);
            }}
          >
            <FaRegComment className="text-[25px]" />
          </div>
          <CommentBox
            showCommentBox={showCommentBox}
            setShowCommentBox={setShowCommentBox}
          />

          <TbLocationShare className="text-[25px]" />
        </div>
        <div onClick={() => SaveOrUnsaveHandler(post.id)}>
          {saved ? <SavedIcon /> : <SaveIcon />}
        </div>
      </div>
      <div>{post.likes.length} Likes</div>
      <div className="flex items-center ">
        <h1>{post?.author?.username}</h1>
        <p className="ml-2 text-[14px]">{post.caption}</p>
      </div>
      <div
        className="text-sm my-1 text-gray-500 dark:text-gray-400"
        onClick={() => {
          dispatch(selectedPost(post));
          setShowCommentBox(true);
        }}
      >
        View all {postComment.length} comments
      </div>
      <div className="relative mt-3 dark:bg-slate-900">
        <input
          placeholder="Add a comment..."
          className="border-0 focus:outline-none focus:border-none w-full pr-12  dark:bg-slate-800"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          onFocus={FaBorderNone}
        />
        {comment.length > 0 && (
          <button
            onClick={() => CommentHandler(post.id)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 font-medium"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Post"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
