import React from "react";
import { MdElectricBolt } from "react-icons/md";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { GiPayMoney } from "react-icons/gi";
import { CgMoreO } from "react-icons/cg";
import { BsCashStack } from "react-icons/bs";
import { FaTrophy, FaPhoneSquareAlt, FaGift } from "react-icons/fa";
import { TbMobiledata } from "react-icons/tb";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  setServiceName,
  setShowShareCost,
} from "../../../../../../slice/dashboard";

const ServicesDashboard = () => {
  const dispatch = useDispatch();

  const handleServiceClick = (value) => {
    dispatch(setShowShareCost(true));
    dispatch(setServiceName(value));
  };
  return (
    <div className="bg-primary lg:mb-10 mb-6 shadow-lg py-8 lg:px-10 px-6 rounded-[20px]">
      <div className="flex flex-col gap-y-5">
        <span className="lg:text-base text-sm">Services</span>
        <div className="grid grid-cols-5 gap-10 gap-x-12 lg:gap-x-10">
          <div
            className="flex w-full flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in"
            onClick={() => handleServiceClick("Airtime")}
          >
            <FaPhoneSquareAlt size={30} color="#3745c0" />
            <span className="text-xs lg:text-base">Airtime</span>
          </div>
          <div
            className="flex w-full flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in"
            onClick={() => handleServiceClick("Data Bundle")}
          >
            <TbMobiledata size={30} color="#3745c0" />
            <span className="text-xs text-wrap lg:text-base">Data</span>
          </div>
          <div
            className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in"
            onClick={() => handleServiceClick("Electricity")}
          >
            <MdElectricBolt size={30} color="#3745c0" />
            <span className="text-xs lg:text-base">Electricity</span>
          </div>
          <div
            className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in"
            onClick={() => handleServiceClick("TV subscription")}
          >
            <PiTelevisionSimpleBold size={30} color="#3745c0" />
            <span className="text-xs lg:text-base">TV</span>
          </div>
          <div
            className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in"
            onClick={() => handleServiceClick("Gift Card")}
          >
            <FaGift size={30} color="#3745c0" />
            <span className="text-xs text-nowrap lg:text-base">Gift Card</span>
          </div>
          <div className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <BsCashStack size={30} color="#3745c0" />
            <span className="text-xs text-nowrap lg:text-base">Loan</span>
          </div>
          <div className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <LiaPiggyBankSolid size={30} color="#3745c0" />
            <span className="text-xs text-nowrap lg:text-base">Savings</span>
          </div>
          <div className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <FaTrophy size={30} color="#3745c0" />
            <span className="text-xs text-nowrap lg:text-base">Win Big</span>
          </div>
          <div className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <GiPayMoney size={30} color="#3745c0" />
            <span className="text-xs text-nowrap lg:text-base">
              Refer & Earn
            </span>
          </div>
          <div className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <CgMoreO size={30} color="#3745c0" />
            <span className="text-xs text-nowrap lg:text-base">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDashboard;
