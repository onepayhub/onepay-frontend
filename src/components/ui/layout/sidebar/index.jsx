import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sideLinks } from "../../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { setAccessToken, setUser } from "../../../../slice/signup";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeId, setActiveId] = useState(0);
  const handleLogout = () => {
    dispatch(setAccessToken(""));
    dispatch(setUser([]));
    navigate("/prototype/signin");
  };

  return (
    <>
      <div className="w-full flex-col gap-y-6 hidden md:flex">
        <div className="flex w-full justify-center pt-8">
          <span className="text-primary text-2xl font-semibold">OnePay</span>
        </div>
        <div className="w-full bg-primary bg-opacity-25 p-[0.5px]" />

        <div className="mr-3 flex flex-col gap-y-8 px-2">
          {sideLinks.map((link) => (
            <Link
              to={`#`}
              className={`mx-auto flex w-full items-center gap-x-6 rounded-[5px] px-3 py-4 transition-all ease-in hover:cursor-pointer hover:bg-primary hover:bg-opacity-20 ${
                link.id === activeId && "bg-primary bg-opacity-20"
              }`}
              key={link.id}
              onClick={() => {
                setActiveId(link.id);
              }}
            >
              <img src={link.icon} alt="icon" />
              <span className="text-base font-medium text-primary">
                {link.link}
              </span>
            </Link>
          ))}
          <span
            onClick={handleLogout}
            className="mx-auto text-primary mt-36  font-medium flex w-full items-center gap-x-3 rounded-[5px] px-3 py-4 transition-all ease-in hover:cursor-pointer hover:bg-primary hover:bg-opacity-20"
          >
            <IoMdLogOut size={23} />
            Log out
          </span>
        </div>
      </div>
      <div className="bottom-0 flex items-center w-full md:hidden">
        {sideLinks.map((link) => (
          <Link
            to={`#`}
            className={`mx-auto flex flex-col text-sm w-full items-center gap-x-3 rounded-[5px] px-3 py-4 transition-all ease-in hover:cursor-pointer hover:bg-primary hover:bg-opacity-20 ${
              link.id === activeId && "bg-primary bg-opacity-20"
            }`}
            key={link.id}
            onClick={() => {
              setActiveId(link.id);
            }}
          >
            <img src={link.icon} alt="icon" />
            <span className="font-medium text-primary">{link.link}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
