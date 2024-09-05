import { Avatar, Button } from "flowbite-react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useGetRTM from "../hooks/useGetRTM";

const MessageBox = ({ selectedUser }) => {
  useGetRTM();
  const { messages } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.user);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="pt-3 overflow-y-scroll h-[485px] dark:bg-gray-800 bg-gray-100">
      <div className="w-full flex flex-col justify-center items-center">
        <Avatar
          className="rounded-full object-cover text-3xl border-2"
          img={selectedUser?.profilePicture}
          rounded
          size={"lg"}
          shadow="md"
          alt="Profile Picture"
        />
        <div className="flex flex-col justify-center items-center mt-3">
          <h1 className="text-3xl font-medium dark:text-white pb-4">
            {selectedUser?.username}
          </h1>
          <Link to={`/profile/${selectedUser?.id}`}>
            <Button size="xs" color="light" className="w-[150px]">
              View profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4 p-4 ">
        {messages &&
          messages.map((msg) => (
            <p
              key={msg.id}
              className={`p-2  rounded-lg shadow-md max-w-full w-max ${
                msg.senderId === currentUser?.user?.id
                  ? "bg-blue-500 text-white self-end dark:text-white dark:bg-stone-950"
                  : "bg-white text-black self-start"
              }`}
            >
              {msg.message}
            </p>
          ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default MessageBox;
