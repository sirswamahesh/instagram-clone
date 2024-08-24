import { SideBar } from "./Sidebar";

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full hidden md:inline">
        <SideBar />
      </div>
      <main className="flex ml-[250px] pl-4 items-center justify-center w-full">
        {children}
      </main>
    </div>
  );
};
export default LayoutWithSidebar;
