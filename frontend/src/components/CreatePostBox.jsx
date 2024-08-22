import { Avatar, Button, Modal, Spinner, Toast } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getPosts } from "../redux/post/postSlice";
import { authUser } from "../redux/user/userSlice";

import { useNavigate } from "react-router-dom";
export function CreatePostBox({ openModal, setOpenModal }) {
  const { currentUser } = useSelector((state) => state.user);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef();
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [currentUserPost, setCurrentUserPost] = useState();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !image) {
      return alert("Please fill out all fields.");
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", imgRef.current.files[0]);
    setLoading(true);
    try {
      const res = await fetch("/api/post/addpost", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        dispatch(getPosts([data.post, ...post.posts]));
        const updatedUser = {
          ...currentUser.user,
          posts: [...(currentUser?.user?.posts || []), data.post],
        };

        dispatch(authUser(updatedUser));
        setCaption("");
        setImage(null);
        toast.success(data.message);
        setTimeout(() => {
          navigation("/");
        }, 3000);
      } else {
        throw new Error("Failed to create post");
      }
      setOpenModal(false);
    } catch (error) {
      console.error(error);
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
          <div className="flex flex-col justify-center">
            <p className="mt-4 text-md text-gray-800 text-center">
              Create New Post
            </p>
            <hr className="border-gray-300 mb-2" />
            <div className="flex gap-3 mb-3">
              <Avatar
                placeholderInitials="CN"
                className="object-cover"
                rounded
                img={currentUser?.user?.profilePicture || ""}
              />
              <div className="font-medium dark:text-white">
                <h1>{currentUser?.user?.username}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Bio...
                </p>
              </div>
            </div>
            <div>
              <label className="text-md font-medium text-gray-800 dark:text-gray-200">
                Caption
              </label>
              <textarea
                className="border-gray-300 w-full p-3 mt-2 rounded-md"
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <input
                type="file"
                ref={imgRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*" // Accept image files only
              />

              {image && (
                <div className="mt-1">
                  <img
                    src={image}
                    alt="image"
                    className="mt-2 w-full h-[200px] rounded-md object-cover"
                  />
                </div>
              )}
              <Button
                color="blue"
                className="mt-3 w-full"
                onClick={handleImageClick}
              >
                Select from computer
              </Button>

              {image && (
                <Button onClick={handleSubmit} className="mt-3 w-full">
                  {loading ? (
                    <div className="flex gap-1">
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </div>
                  ) : (
                    "Post"
                  )}
                </Button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
