import React from "react";
import { BsPersonSquare } from "react-icons/bs";
import { BsBank2 } from "react-icons/bs";
import { FaPiggyBank } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setShowOnepay } from "../../../../../../slice/dashboard";

const TransferDashboard = () => {
  const dispatch = useDispatch();
  
  const handleOnepayClick = () => {
    dispatch(setShowOnepay(true))
  };

  return (
    <div className="bg-primary mb-10 shadow-lg py-8 px-6 lg:px-10 rounded-[20px]">
      <div className="flex flex-col gap-y-5">
        <span className="text-sm lg:text-base">Money Transfer</span>
        <div className="flex items-center justify-between">
          <div
            className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in"
            onClick={handleOnepayClick}
          >
            <BsPersonSquare size={30} color="#3745c0" />
            <span className="text-xs lg:text-base">To Onepay</span>
          </div>
          <div className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <BsBank2 size={30} color="#3745c0" />
            <span className="text-xs lg:text-base">To Bank</span>
          </div>
          <div className="flex flex-col items-center gap-y-1 hover:cursor-pointer hover:scale-105 transition-all ease-in">
            <FaPiggyBank size={30} color="#3745c0" />
            <span className="text-xs lg:text-base">Withdraw</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferDashboard;
