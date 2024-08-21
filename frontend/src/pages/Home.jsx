import React, { useEffect } from "react";
import Feeds from "../components/Feeds";
import RightSidebar from "../components/RightSidebar";
import { getPosts } from "../redux/post/postSlice";
import { useDispatch } from "react-redux";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllPosts = async () => {
      const res = await fetch("/api/post/all");
      const data = await res.json();
      if (res.ok) {
        dispatch(getPosts(data.posts));
      } else {
        throw new Error("Failed to fetch posts");
      }
    };
    getAllPosts();
  }, []);
  return (
    <div className="flex p-5">
      <div className="w-full ">
        <Feeds />
      </div>
      <div className="w-[600px] ">
        <RightSidebar />
      </div>
    </div>
  );
}
