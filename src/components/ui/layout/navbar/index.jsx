import React, { useEffect, useState } from "react";
import {
  IoMdCall,
  IoMdLogOut,
  IoMdNotificationsOutline,
  IoMdSearch,
} from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { ProfileImage } from "../../../../constants/images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setUser } from "../../../../slice/signup";
import { setShowNotification } from "../../../../slice/dashboard";

const Navbar = ({ user }) => {
  const [notificationLength, setNotificationLength] = useState();
  const allNotification = useSelector(
    (state) => state?.dashboard.states.notificationData
  );
  console.log(notificationLength)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);

  const handleOptionsClick = () => {
    setShowOption(!showOption);
  };
  const handleLogout = () => {
    dispatch(setAccessToken(""));
    dispatch(setUser([]));
    navigate("/prototype/signin");
  };
  const handleNotification = () => {
    dispatch(setShowNotification(true))
  }
  useEffect(() => {
    setNotificationLength(allNotification.length);
  }, [allNotification]);
  return (
    <div className="flex w-full">
      <div className="relative md:ml-16 ml-5 flex w-3/4 items-center md:justify-center">
        <input
          type="text"
          name="search"
          id="search"
          className="w-1/2 md:block hidden rounded-[5px] border border-[#AEAEAE] px-10 py-2 placeholder:text-xs placeholder:font-medium placeholder:text-[#AEAEAE] md:placeholder:text-sm "
          placeholder="Search"
        />{" "}
        <div className="absolute md:block hidden left-[25%] px-2">
          <IoMdSearch size={25} color="#181818" />
        </div>
        <div className="flex md:hidden items-center gap-x-2">
          <img
            src={ProfileImage}
            className="w-[50px] rounded-[50%]"
            alt="profile image"
          />
          <div className="flex flex-col gap-y-1">
            <span className="text-sm font-normal text-[#181818] md:text-base">
              Welcome, {user.firstName}
            </span>
            <span className="font-medium text-xs">ID: {user.uuid}</span>
          </div>
        </div>
      </div>

      <div className="ml-auto relative flex w-fit items-center gap-x-4 lg:gap-x-10 px-8">
        <div className="relative z-20" onClick={handleNotification}>
          <IoMdNotificationsOutline size={25} color="#181818" />
          <div
            className={`absolute bottom-[16px] text-sm left-[10px] flex h-[20px] w-[20px] items-center justify-center rounded-[50%] ${
              notificationLength !== 0 && "bg-secondary"
            } font-semibold text-primary`}
          >
            {notificationLength}
          </div>
        </div>
        <IoMdCall size={25} color="#181818" />
        <SlOptionsVertical
          size={25}
          color="#181818"
          className="cursor-pointer lg:hidden"
          onClick={handleOptionsClick}
        />
        <div className="md:flex hidden items-center gap-x-4">
          <img
            src={ProfileImage}
            className="w-[50px] rounded-[50%]"
            alt="profile image"
          />
          <div className="flex flex-col">
            <span className="text-sm font-normal text-[#181818] md:text-base">
              Welcome, <br /> {user.firstName} <br />
              <span className="font-medium">ID: {user.uuid}</span>
            </span>
          </div>
        </div>
        {showOption && (
          <div className="absolute top-[120%] w-[150px] bg-[#eeeded] rounded-[5px]">
            <div className="flex flex-col items-center ">
              <div
                className="flex flex-1 items-center font-medium w-full py-2 justify-center gap-x-2"
                onClick={handleLogout}
              >
                <IoMdLogOut size={15} />
                <span>Log out</span>{" "}
              </div>
              <hr color="#aeaeae" className="w-full" />
              <div className="flex flex-1 items-center font-medium w-full  py-2 justify-center gap-x-2">
                <IoMdLogOut size={15} />
                <span>Settings</span>{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
