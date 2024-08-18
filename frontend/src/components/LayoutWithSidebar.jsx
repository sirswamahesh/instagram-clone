import { SideBar } from "./Sidebar";

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full">
        <SideBar />
      </div>
      <main className="flex-grow ml-[250px] p-4">{children}</main>
    </div>
  );
};
export default LayoutWithSidebar;
