import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/chat/chatSlice";
import { setMessageNotifications } from "../redux/notification/rtnSlice";

const useGetRTM = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { messageNotifications } = useSelector((state) => state.rtn);
  const { messages } = useSelector((state) => state.chat);

  useEffect(() => {
    if (socket) {
      socket?.on("newMessage", (newMessage) => {
        dispatch(setMessages([...messages, newMessage]));
      });
    }
    return () => {
      socket?.off("newMessage");
    };
  }, [messages, setMessages]);
};

export default useGetRTM;
