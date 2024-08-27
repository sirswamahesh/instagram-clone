import { SideBar } from "./Sidebar";

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full hidden md:inline">
        <SideBar />
      </div>
      <main className="flex md:ml-[250px] items-center justify-center w-full ">
        {children}
      </main>
    </div>
  );
};
export default LayoutWithSidebar;
