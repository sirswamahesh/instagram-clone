import React, { useEffect } from "react";
import Feeds from "../components/Feeds";
import RightSidebar from "../components/RightSidebar";
import { getPosts } from "../redux/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../redux/user/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await fetch("/api/post/all");
        const data = await res.json();

        if (res.ok) {
          dispatch(getPosts(data.posts));

          const currentUserPosts = data.posts.filter(
            (p) => p.author._id === currentUser?._id
          );

          if (currentUserPosts.length > 0) {
            dispatch(authUser({ ...currentUser, posts: currentUserPosts }));
          }
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getAllPosts();
  }, [dispatch, currentUser]);

  return (
    <div className="flex p-5">
      <div className="w-full">
        <Feeds />
      </div>
      <div className="w-[600px]">
        <RightSidebar />
      </div>
    </div>
  );
}
