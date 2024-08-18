import { Avatar, Button, Card } from "flowbite-react";
import { IoPersonAddSharp } from "react-icons/io5";

export function Account() {
  return (
    <div className="flex flex-col  w-[370px]">
      <div className="flex gap-3">
        <Avatar placeholderInitials="CN" className="object-cover" rounded />
        <div className="font-medium dark:text-white">
          <h1>mahesh_sirswa</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Joined in August 2014
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="text-center">
          <p>1</p>
          <p>Posts</p>
        </div>
        <div className="text-center">
          <p>1</p>
          <p>Follower</p>
        </div>
        <div className="text-center">
          <p>1</p>
          <p>Following</p>
        </div>
      </div>
      <hr className="my-3" />
      <Button
        className="bg-blue-500 text-white flex items-center"
        color={"blue"}
      >
        <IoPersonAddSharp className="text-[15px] mr-2" /> Follow
      </Button>
    </div>
  );
}
