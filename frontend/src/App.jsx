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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWithSidebar>
              <Home />
            </LayoutWithSidebar>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
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
          path="/Profile"
          element={
            <LayoutWithSidebar>
              <Profile />
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
      </Routes>
    </BrowserRouter>
  );
}
