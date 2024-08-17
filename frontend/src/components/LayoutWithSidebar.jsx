import { SideBar } from "./Sidebar";

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};
export default LayoutWithSidebar;
