import React, { useEffect, useState } from "react";
import { Button } from "../../../../../../components/";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const AccountDashboard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [availableBalance, setAvailableBalance] = useState("125,000.00");

  const handleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  useEffect(() => {
    if (showBalance) {
      setAvailableBalance("*****");
    } else {
      setAvailableBalance("125,000.00");
    }
  }, [showBalance]);

  return (
    <div className="bg-[#aeb2e9] shadow-lg mb-6 py-8 px-4 lg:px-10 rounded-[20px]">
      <div className="flex flex-col gap-y-3 w-full items-start justify-between">
        <div className="flex justify-between w-full items-start">
          <div className="flex items-center gap-x-1">
            {" "}
            <AiTwotoneSafetyCertificate color="#1da829" />
            <span className="text-xs lg:text-sm mt-auto">
              Available Balance
            </span>
            {showBalance ? (
              <LuEyeOff
                onClick={handleShowBalance}
                className="cursor-pointer"
              />
            ) : (
              <LuEye onClick={handleShowBalance} className="cursor-pointer" />
            )}
          </div>
          <div className="flex items-center">
            <span className="text-xs lg:text-sm mt-auto">
              Transaction History
            </span>
            <MdOutlineKeyboardArrowRight className="cursor-pointer" size={15} />
          </div>
         
        </div>
        <div className="flex justify-between items-center w-full">
           <div className="font-semibold text-[#3a3939] flex gap-x-1 items-center">
            {!showBalance && <span className="text-sm lg:text-xl">₦</span>}
            <span className="lg:text-2xl ">{availableBalance}</span>
          </div>
          <Button className="lg:text-base !px-4 !text-xs !rounded-[30px] flex gap-x-2 items-center">
            <span>+</span>
            <span>Add money</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
