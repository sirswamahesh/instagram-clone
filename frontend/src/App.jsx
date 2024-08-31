import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Explore from "./pages/Explore";
import LayoutWithSidebar from "./components/LayoutWithSidebar";
import Search from "./pages/Search";
import Reels from "./pages/Reels";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Message";
import Setting from "./pages/Setting";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import EditProfille from "./pages/EditProfille";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socket/socketSlice";
import { setOnlineUsers } from "./redux/chat/chatSlice";
import {
  setFollowNotifications,
  setLikeNotifications,
  setMessageNotifications,
} from "./redux/notification/rtnSlice";
export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);

  const { messageNotifications } = useSelector((state) => state.rtn);
  useEffect(() => {
    if (currentUser?.user) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: currentUser?.user?.id,
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socket));
      socket.on("notification", (notification) => {
        dispatch(setLikeNotifications(notification));
      });
      socket.on("getOnlineUsers", (onlineUsers) => {
        console.log("getOnlineUsers", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });

      socket.on("newMessage", (newMessage) => {
        dispatch(setMessageNotifications({ ...newMessage, seen: false }));
      });
      socket.on("followNotifaction", (followNotification) => {
        console.log("hhhhhhh", followNotification);
        dispatch(setFollowNotifications(followNotification));
      });
      return () => {
        socket.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket?.close();
      dispatch(setSocket(null));
    }
  }, [currentUser?.user, dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <LayoutWithSidebar>
                <Home />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/explore"
            element={
              <LayoutWithSidebar>
                <Explore />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/search"
            element={
              <LayoutWithSidebar>
                <Search />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/Reels"
            element={
              <LayoutWithSidebar>
                <Reels />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/messages"
            element={
              <LayoutWithSidebar>
                <Messages />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/notifications"
            element={
              <LayoutWithSidebar>
                <Notifications />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/create-post"
            element={
              <LayoutWithSidebar>
                <CreatePost />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <LayoutWithSidebar>
                <Profile />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <LayoutWithSidebar>
                <EditProfille />
              </LayoutWithSidebar>
            }
          />
          <Route
            path="/setting"
            element={
              <LayoutWithSidebar>
                <Setting />
              </LayoutWithSidebar>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
      <Toaster />
    </BrowserRouter>
  );
}
