import { Avatar, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setSelectedUser } from "../redux/chat/chatSlice";
import MessageBox from "../components/MessageBox";
import CustomToast from "../components/CustomToast";
const Messages = () => {
  const { currentUser, suggestedUsers } = useSelector((state) => state.user);
  const { selectedUser, onlineUsers, messages } = useSelector(
    (state) => state.chat
  );

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSelectedUser = (user) => {
    dispatch(setSelectedUser(user));
  };
  const messageHandler = async () => {
    try {
      if (message) {
        setLoading(true);
        const res = await fetch(`/api/message/send/${selectedUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
          const updatedMessages = [...messages, data.newMessage];
          dispatch(setMessages(updatedMessages));
          setLoading(false);
          setMessage("");
        }
      } else {
        console.log("message is empty");
        CustomToast("Please enter a message");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      CustomToast(error.message);
    }
  };

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await fetch(`/api/message/all/${selectedUser?._id}`);
        const data = await res.json();
        if (res.ok) {
          dispatch(setMessages(data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMessages();
  }, [selectedUser]);
  return (
    <div className="flex w-full h-screen ">
      <div className="border w-[30%]">
        <div className="p-4 border-b-2">
          <div className="flex gap-3 ">
            <Avatar
              placeholderInitials="CN"
              className="object-cover"
              img={currentUser?.user?.profilePicture}
              rounded
            />
            <div className="font-medium dark:text-white">
              <div className="flex items-center gap-2">
                <h1>{currentUser?.user?.username}</h1>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentUser?.user?.bio}
              </p>
            </div>
          </div>
        </div>
        <h1 className="px-4 py-2">Messages</h1>

        {suggestedUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          return (
            <div
              key={user._id}
              className="px-4 flex justify-between items-center group relative my-3 cursor-pointer"
              onClick={() => handleSelectedUser(user)}
            >
              <div className="flex gap-3">
                <Avatar
                  placeholder
                  Initials="CN"
                  img={user?.profilePicture}
                  className="object-cover"
                  rounded
                />
                <div className="font-medium dark:text-white">
                  <h1>{user?.username}</h1>
                  <p
                    className={`text-xs font-bold ${
                      isOnline ? "text-yellow-500" : "text-red-600"
                    } `}
                  >
                    {isOnline ? "online" : "offline"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border w-[70%] relative ">
        {selectedUser ? (
          <div className="flex gap-3 border-b-2 px-4 py-2 h-[80px] items-center">
            <Avatar
              className="rounded-full object-cover text-3xl border-2"
              // placeholderInitials="CN"
              img={selectedUser?.profilePicture}
              rounded
              alt="Profile Picture"
            />
            <div className="font-medium dark:text-white ">
              <h1 className="text-[18px]">{selectedUser?.username}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedUser?.bio}
              </p>
            </div>
          </div>
        ) : (
          <div className="">send message</div>
        )}
        <div>
          <MessageBox selectedUser={selectedUser} />
        </div>
        <div>
          <div className="absolute bottom-0 left-0 right-0 border-t-[1px] flex gap-4 p-3 mt-2 bg-white">
            <input
              placeholder="Send a message..."
              className="border-0 focus:outline-none w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            {message?.length > 0 && (
              <button
                className="text-blue-500 font-medium"
                onClick={messageHandler}
              >
                {loading ? (
                  <div className="flex gap-2">
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
