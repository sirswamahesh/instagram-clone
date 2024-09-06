import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Feeds = () => {
  const { posts } = useSelector((state) => state.post);
  return (
    <div className="w-full pb-5">
      {posts.map((post, i) => (
        <Post post={post} key={i} />
      ))}
    </div>
  );
};

export default Feeds;
