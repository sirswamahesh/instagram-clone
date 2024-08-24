import { Avatar, Button, Card } from "flowbite-react";
import { IoPersonAddSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

export function Account() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return (
    <div className="flex flex-col  w-[370px]">
      <div className="flex gap-3">
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
      <div className="flex justify-between items-center mt-3">
        <div className="text-center">
          <p>{currentUser?.user?.posts.length || 0}</p>
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
