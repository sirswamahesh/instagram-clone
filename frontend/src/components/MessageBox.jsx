import { Avatar, Button } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MessageBox = ({ selectedUser }) => {
  const { messages } = useSelector((state) => state.chat);
  console.log(messages, "message");
  return (
    <div className="pt-3 overflow-y-scroll h-[470px] bg-gray-100">
      <div className="w-full flex flex-col justify-center items-center">
        <Avatar
          className="rounded-full object-cover text-3xl border-2"
          //   placeholderInitials="CN"
          img={selectedUser?.profilePicture}
          rounded
          size={"lg"}
          shadow="md"
          alt="Profile Picture"
        />
        <div className=" flex flex-col justify-center items-center mt-3">
          <h1 className="text-3xl font-medium dark:text-white pb-4">
            {selectedUser?.username}
          </h1>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button size="xs" color="light" className=" w-[150px]">
              View profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4 p-4  rounded-md ">
        {messages &&
          messages.map((msg) => (
            <p
              key={msg._id}
              className="bg-white text-black p-2 rounded-lg shadow-md w-max max-w-full"
            >
              {msg.message}
            </p>
          ))}
      </div>
    </div>
  );
};

export default MessageBox;
