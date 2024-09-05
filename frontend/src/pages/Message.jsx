import { Avatar, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setSelectedUser } from "../redux/chat/chatSlice";
import MessageBox from "../components/MessageBox";
import CustomToast from "../components/CustomToast";
import { IoMdArrowBack } from "react-icons/io";

import { HiOutlineChatAlt2, HiArrowLeft } from "react-icons/hi"; // Import back arrow icon
import { markAllMessageNotificationsAsSeen } from "../redux/notification/rtnSlice";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigation = useNavigate();
  const { currentUser, suggestedUsers } = useSelector((state) => state.user);
  const { messageNotifications } = useSelector((state) => state.rtn);
  const { selectedUser, onlineUsers, messages } = useSelector(
    (state) => state.chat
  );

  const unReadMsg = messageNotifications.filter((msg) => msg.seen == false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const dispatch = useDispatch();

  const handleSelectedUser = (user) => {
    dispatch(setSelectedUser(user));
  };

  const handleBackToSuggestedUsers = () => {
    dispatch(setSelectedUser(null));
  };

  const messageHandler = async (e) => {
    e.preventDefault();
    try {
      if (message) {
        setLoading(true);
        const res = await fetch(`/api/message/send/${selectedUser.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        const data = await res.json();
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
        const res = await fetch(`/api/message/all/${selectedUser?.id}`);
        const data = await res.json();
        if (res.ok) {
          dispatch(setMessages(data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedUser) fetchAllMessages();
  }, [selectedUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(markAllMessageNotificationsAsSeen());
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="flex w-full h-screen">
      {!selectedUser || !isMobile ? (
        <div
          className={`border dark:border-black ${
            isMobile ? "w-full" : "w-[35%]"
          } sm:inline`}
        >
          <div className="border-b-[1px]  dark:border-black  flex p-4 h-[70px]">
            <div className="flex gap-3 items-center">
              <div onClick={() => navigation("/")}>
                <IoMdArrowBack size={20} />
              </div>
              <Avatar
                placeholderInitials="CN"
                className="object-cover"
                img={currentUser?.user?.profilePicture}
                rounded
              />
              <div className="flex items-center gap-2 font-medium dark:text-white">
                <h1 className="text-[18px]">{currentUser?.user?.username}</h1>
              </div>
            </div>
          </div>
          <h1 className="px-4 py-2">Messages</h1>
          {suggestedUsers.map((user) => {
            const isOnline = onlineUsers.includes(user.id);
            const unRead = unReadMsg.filter((msg) => msg.senderId === user.id);
            return (
              <div
                key={user.id}
                className="px-4 flex justify-between items-center group relative my-3 cursor-pointer"
                onClick={() => handleSelectedUser(user)}
              >
                <div className="flex gap-3 items-start">
                  <Avatar
                    placeholderInitials="CN"
                    img={user?.profilePicture}
                    className="object-cover"
                    rounded
                    status={`${isOnline && "online"}`}
                    statusPosition="bottom-right"
                  />
                  <div className="font-medium dark:text-white">
                    <h1>{user?.username}</h1>
                    <p className="text-xs font-bold text-green-600">
                      {unRead.length > 0 && `${unRead.length} new messages`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {(selectedUser && isMobile) || !isMobile ? (
        <div className=" dark:border-slate-900  sm:w-[65%] relative w-full">
          {selectedUser ? (
            <>
              <div className="flex gap-3 border-b-[1px] dark:border-slate-900  px-4 py-2 items-center h-[70px]">
                {isMobile && selectedUser && (
                  <div onClick={handleBackToSuggestedUsers}>
                    <IoMdArrowBack size={20} />
                  </div>
                )}
                <Avatar
                  className="rounded-full object-cover text-3xl border-2"
                  img={selectedUser?.profilePicture}
                  rounded
                  alt="Profile Picture"
                />
                <div className="font-medium dark:text-white">
                  <h1 className="text-[18px]">{selectedUser?.username}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedUser?.bio}
                  </p>
                </div>
              </div>
              <div>
                <MessageBox selectedUser={selectedUser} />
              </div>
              <div>
                <form
                  onSubmit={messageHandler}
                  className="absolute bottom-0 left-0 right-0 border-t-[1px] dark:border-slate-900 flex gap-4 p-3 mt-2 "
                >
                  <input
                    placeholder="Send a message..."
                    className="border-0 focus:outline-none w-full dark:text-black dark:bg-slate-800"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  {message?.length > 0 && (
                    <button className="text-blue-500 font-medium" type="submit">
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
                </form>
              </div>
            </>
          ) : (
            <div className="text-center flex flex-col items-center h-full justify-center">
              <HiOutlineChatAlt2 className="text-6xl text-gray-400 mb-4" />
              <button className="text-blue-500 font-medium text-lg">
                Send Message
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Messages;
