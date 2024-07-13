import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [userDetails, setUserDetails] = useState([])
  const user = useSelector((state) => state.auth.states.user);

  useEffect(() => {
    setUserDetails(user)
  }, [])
  return (
    <div className="relative">
      <div className="flex h-screen">
        <div className="fixed flex z-20 h-[80px] w-full bg-primary shadow-xl">
          <Navbar user={userDetails} />
        </div>
        <div className="z-50 md:h-full w-full md:static fixed bottom-0 md:w-[15%] overflow-hidden bg-[#323b6d]">
          <Sidebar />
        </div>
        <div className="w-3/4 flex-grow overflow-y-auto bg-[#F8F8F8] p-4 lg:pl-14 pt-[7rem] lg:pt-36">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
