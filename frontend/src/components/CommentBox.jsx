import { Avatar, Button, Modal, Spinner, TextInput } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, setSelectedPost } from "../redux/post/postSlice";
import CustomToast from "./CustomToast";

const CommentBox = ({ showCommentBox, setShowCommentBox }) => {
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { selectedPost, posts } = useSelector((state) => state.post);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [postComment, setPostComment] = useState([]);
  useEffect(() => {
    setPostComment(selectedPost?.comments);
  }, [selectedPost]);
  const CommentHandler = async () => {
    setLoading(true);
    const res = await fetch(`/api/post/${selectedPost.id}/comment`, {
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
        p.id === selectedPost.id
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
  const handleCloseModal = () => {
    dispatch(setSelectedPost(null));
    setShowCommentBox(false);
    console.log("dsss");
  };
  return (
    <>
      <Modal
        show={showCommentBox}
        onClose={handleCloseModal}
        dismissible
        // popup
        style={{
          maxWidth: "none",
          display: "flex",
          justifyContent: "center",
          maxHeight: "none",
        }}
      >
        <Modal.Body className="p-0 rounded-sm m w-[55rem] max-h-[50rem]">
          <div className="flex">
            <div className="flex-1 ">
              <img
                src={selectedPost?.image}
                width={"100%"}
                height={"100%"}
                alt="img"
                className="rounded object-contain h-full w-full"
              />
            </div>
            <div className="flex-1 w-full relative">
              <div className="flex gap-3 p-3 border-b-[1px]">
                <Avatar
                  placeholderInitials="CN"
                  img={currentUser?.user?.profilePicture}
                  className="object-cover"
                  rounded
                />
                <div className="font-medium dark:text-white">
                  <h1>{currentUser?.user?.username}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentUser?.user?.bio}
                  </p>
                </div>
              </div>
              <div className=" max-h-[400px] overflow-y-scroll pb-8">
                {postComment?.map((comment, i) => (
                  <div className="mt-1 p-3" key={i}>
                    <div className="flex gap-3 p-3 items-start">
                      <Avatar
                        placeholderInitials="CN"
                        img={comment?.author?.profilePicture}
                        className="object-cover"
                        rounded
                      />
                      <div className="font-medium dark:text-white">
                        <h1>{comment?.author?.username}</h1>
                        <p className="text-[12px] text-gray-500 dark:text-gray-400">
                          {moment(comment.createdAt).fromNow()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {comment?.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 border-t-[1px] flex gap-4 p-3 bg-white">
                <input
                  placeholder="Add a comment..."
                  className="border-0 focus:outline-none w-full"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                {comment.length > 0 && (
                  <button
                    className="text-blue-500 font-medium"
                    onClick={CommentHandler}
                  >
                    {loading ? (
                      <div className="flex gap-2">
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </div>
                    ) : (
                      "Post"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommentBox;
