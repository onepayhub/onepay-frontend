import React from "react";
import { MdRampRight } from "react-icons/md";
import { Link } from "react-router-dom";

const ThirdSection = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-y-6 gap-x-5 my-10 container container-md mx-auto">
      <div className="flex gap-y-3 flex-col lg:w-[70%] pl-16 py-5 rounded-[20px] hover:scale-105 transition-all ease-in bg-[#EEE]">
        <span className="border border-[#181818] px-4 py-[2px] rounded-[10px] w-fit">
          01
        </span>
        <span className="lg:text-xl text-[#49529b] font-medium">Share Expenses</span>
        <span className="text-[#181818] text-sm lg:text-base w-3/4">
        Effortlessly share expenses and multiply your savings with another user.
        </span>
        <div className="flex gap-x-2 items-center">
          <div className="bg-[#49529b] w-[30px] px-1 items-center flex justify-center px- h-[12p rounded-[50%]">
            <MdRampRight color="#fff" size={25} />
          </div>
          <Link to={"#"} className="text-[#181818] text-sm lg:text-base">
            Read more
          </Link>
        </div>
      </div>
      <div className="flex gap-y-3 flex-col lg:w-[70%] pl-16 py-5 rounded-[20px] hover:scale-105 transition-all ease-in bg-[#EEE]">
        <span className="border border-[#181818] px-4 py-[2px] rounded-[10px] w-fit">
          02
        </span>
        <span className="lg:text-xl text-[#49529b] font-medium">One ID for All Banks</span>
        <span className="text-[#181818] text-sm lg:text-base w-3/4">
        Simplifies transfers by using a unique ID for selecting banks and eliminates the need to remember multiple account numbers.
        </span>
        <div className="flex gap-x-2 items-center">
          <div className="bg-[#49529b] w-[30px] px-1 items-center flex justify-center px- h-[12p rounded-[50%]">
            <MdRampRight color="#fff" size={25} />
          </div>
                    <Link to={"#"} className="text-[#181818] text-sm lg:text-base">
            Read more
          </Link>
        </div>
      </div>
      <div className="flex gap-y-3 flex-col lg:w-[70%] pl-16 py-5 rounded-[20px] hover:scale-105 transition-all ease-in bg-[#EEE]">
        <span className="border border-[#181818] px-4 py-[2px] rounded-[10px] w-fit">
          03
        </span>
        <span className="lg:text-xl text-[#49529b] font-medium">Request Payments</span>
        <span className="text-[#181818] text-sm lg:text-base w-3/4">
        Seamlessly Request, Schedule, and Approve Payments
        </span>
        <div className="flex gap-x-2 items-center">
          <div className="bg-[#49529b] w-[30px] px-1 items-center flex justify-center px- h-[12p rounded-[50%]">
            <MdRampRight color="#fff" size={25} />
          </div>
                    <Link to={"#"} className="text-[#181818] text-sm lg:text-base">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
