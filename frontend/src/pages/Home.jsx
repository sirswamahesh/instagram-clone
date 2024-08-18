import React from "react";
import { SideBar } from "../components/Sidebar";
import Feeds from "../components/Feeds";
import RightSidebar from "../components/RightSidebar";

export default function Home() {
  return (
    <div className="flex p-5">
      <div className="w-full ">
        <Feeds />
      </div>
      <div className="w-[600px] ">
        <RightSidebar />
      </div>
    </div>
  );
}
