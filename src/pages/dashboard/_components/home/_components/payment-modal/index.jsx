import React from "react";
import { useDispatch } from "react-redux";
import { setShowPayment } from "../../../../../../slice/dashboard";

const PaymentModal = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setShowPayment(false));
  };
  return (
    <div className="bg-primary relative lg:w-[60%] lg:px-4 px-2 flex flex-col rounded-[5px] overflow-auto lg:h-fit h-[30vh]">
      <span
        className="text-xl cursor-pointer absolute right-10 top-2"
        onClick={handleClose}
      >
        x
      </span>
      <div className="flex justify-center items-center w-full  pt-14 pb-10 px-4 flex-col gap-y-6">
        <span className="lg:text-xl text-secondary font-medium">
          Enter Payment Pin
        </span>
      </div>
    </div>
  );
};

export default PaymentModal;
