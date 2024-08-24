import { Button, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import CustomToast from "../components/CustomToast";
import { authUser } from "../redux/user/userSlice";
import { getPosts } from "../redux/post/postSlice";
import { useNavigate } from "react-router-dom";

export function DialogBox({ openModal, setOpenModal, post }) {
  const { currentUser } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deletePostHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/post/delete/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        const updatedPosts = posts.filter((p) => p._id !== post._id);
        dispatch(getPosts(updatedPosts));
        const currentUserPosts = posts.filter(
          (p) => p.author._id === currentUser?._id
        );

        if (currentUserPosts.length > 0) {
          dispatch(authUser({ ...currentUser, posts: currentUserPosts }));
        }
        CustomToast(data.message);
        setLoading(false);
        setOpenModal(false);
      } else {
        throw new Error("Failed to delete post.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        dismissible
      >
        <Modal.Body>
          <div className="text-center ">
            {loading ? (
              <>
                <Spinner size="lg" />
                Loading...
              </>
            ) : (
              <>
                <p className="my-5 text-md text-red-800">Report</p>
                <hr className="border-gray-300 mb-5" />
                {currentUser.user._id !== post.author._id && (
                  <>
                    {" "}
                    <p className="mb-5 text-md text-red-800">Unfollow</p>
                    <hr className="border-gray-300 mb-5" />
                  </>
                )}

                <p className="mb-5 text-md text-gray-800">Add to favourites</p>
                <hr className="border-gray-300 mb-5" />

                {currentUser.user._id === post.author._id && (
                  <>
                    <p
                      className="mb-5 text-md text-gray-800 cursor-pointer"
                      onClick={deletePostHandler}
                    >
                      Delete Post
                    </p>
                    <hr className="border-gray-300 mb-5" />
                  </>
                )}
                <p
                  className="text-md text-gray-800 cursor-pointer"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </p>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
