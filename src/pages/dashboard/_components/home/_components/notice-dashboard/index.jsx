import React from "react";
import { BsPersonSquare } from "react-icons/bs";
import { FaPiggyBank } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdElectricBolt } from "react-icons/md";

const NoticeDashboard = () => {
  return (
    <div className="bg-primary shadow-lg py-8 pb-10 lg:px-10 px-6 rounded-[20px]">
      <div className="flex flex-col gap-y-5">
        <span className="lg:text-base text-sm">Notice</span>
        <span className="lg:text-sm text-xs text-lightgray">
          {/* Implemented Functionalities of Prototype:{" "} */}
          {/* <br className="lg:hidden block" /> The 3 core features <br /> <br /> */}
          Find the icon below in the dashboard above and click to view implemented functionality
        </span>
        <div className="flex gap-10 gap-x-20 flex-wrap items-center lg:justify-center justify-center lg:gap-x-10">
          {/* <div className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <BsPersonSquare size={30} color="#3745c0" />
            <span className="text-xs lg:text-base">To Onepay</span>
          </div> */}
          {/* <div className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <FaPiggyBank size={30} color="#3745c0" />
            <span className="text-xs lg:text-base">Request</span>
          </div> */}
          {/* <div className="flex flex-col items-center justify-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <IoMdNotificationsOutline size={30} color="#3745c0" />
            <span className="text-xs text-nowrap lg:text-base">
              Approve Request Payment (Click bell icon on navbar)
            </span>
          </div> */}
          <div className="flex flex-col items-center justify-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <MdElectricBolt size={30} color="#3745c0" />
            <span className="text-xs text-nowrap lg:text-base">
             All Services Offered (Share cost)
            </span>
          </div>
           <div className="flex flex-col items-center justify-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <IoMdNotificationsOutline size={30} color="#3745c0" />
            <span className="text-xs text-nowrap lg:text-base">
             Click on navbar to view notifications
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDashboard;
