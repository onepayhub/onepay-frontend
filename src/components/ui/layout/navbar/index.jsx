import React, { useState } from "react";
import { IoMdCall, IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { ProfileImage } from "../../../../constants/images";

const Navbar = () => {
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
          <div className="flex flex-col">
            <span className="text-sm font-normal text-[#181818] md:text-base">
              Welcome, John
            </span>
          </div>
        </div>
      </div>

      <div className="ml-auto flex w-fit items-center gap-x-7 px-8">
        <div className="relative z-20">
          <IoMdNotificationsOutline size={25} color="#181818" />
          <div className="absolute bottom-[16px] text-sm left-[10px] flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-secondary font-semibold text-primary">
            5
          </div>
        </div>
        <IoMdCall size={25} color="#181818" />
        <div className="md:flex hidden items-center gap-x-2">
          <img
            src={ProfileImage}
            className="w-[50px] rounded-[50%]"
            alt="profile image"
          />
          <div className="flex flex-col">
            <span className="text-sm font-normal text-[#181818] md:text-base">
              Welcome, <br /> John
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
