import { useLocation } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import { SideBar } from "./Sidebar";

const LayoutWithSidebar = ({ children }) => {
  const location = useLocation();
  const isRootPath = location.pathname === "/messages";
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full hidden md:inline">
        <SideBar />
      </div>
      {isRootPath ? " " : <BottomNavbar />}
      <main className="flex md:ml-[250px] items-center justify-center w-full ">
        {children}
      </main>
    </div>
  );
};
export default LayoutWithSidebar;
