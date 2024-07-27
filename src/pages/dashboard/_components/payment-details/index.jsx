import React, { useState } from "react";
import { Button } from "../../../../components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoCheckmark, IoWalletSharp } from "react-icons/io5";
import {
  setPaymentSuccess,
  setShowServicePayment,
  setShowShareCost,
} from "../../../../slice/dashboard";
import { useDispatch, useSelector } from "react-redux";
import PinInput from "react-pin-input";
import { SiAdguard } from "react-icons/si";

const PaymentDetails = ({ serviceAmount, handleReset, serviceName }) => {
  const [success, setSuccess] = useState(false);
  const paymentSuccess = useSelector(
    (state) => state?.dashboard.states.paymentSuccess
  );
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setShowServicePayment(false));
    handleReset();
  };
  const handleKeyDown = (e) => {
    const isValidKey = /^[0-9\b]+$/.test(e.key);
    if (!isValidKey) {
      e.preventDefault();
    }
  };
  const handlePayment = () => {
    setSuccess(true);
  };
  const handleSent = () => {
    dispatch(setPaymentSuccess(true));
  };
  const handleReceiptClick = () => {
    dispatch(setShowServicePayment(false));
    dispatch(setPaymentSuccess(false));
    dispatch(setShowShareCost(false));
  };
  return (
    <div className="bg-primary lg:w-[60%] lg:px-4 px-2 flex flex-col rounded-[5px] overflow-auto lg:h-fit h-[30vh]">
      {!success && (
        <div className="flex relative pt-14 pb-10 px-4 flex-col gap-y-6">
          <span
            className="text-xl cursor-pointer hidden lg:block right-10 top-20 lg:top-6 z-20 absolute"
            onClick={handleCloseModal}
          >
            x
          </span>

          <div className="flex flex-col gap-y-6">
            <div className="lg:w-full lg:mx-auto bg-primary lg:bg- lg:rounded-none left-0 right-0 rounded-[20px] lg:static w-full fixed bottom-[.9rem] py-10 flex justify-start items-start">
              <div className="flex gap-y-2 flex-col w-full">
                <div className="flex gap-y-3 flex-col relative">
                  <span
                    className="text-xl cursor-pointer block lg:hidden right-6 lg:right-10 top-[-5%] lg:top-6 z-20 absolute"
                    onClick={handleCloseModal}
                  >
                    x
                  </span>
                  <div className="font-normal text-[#181818] flex items-center justify-center text-xl lg:text-2xl pb-10">
                    <span className="lg:text-xl text-base mx-1">₦</span>
                    {serviceAmount}
                  </div>

                  <div className="flex justify-between px-4 lg:px-2">
                    <span className="text-sm text-lightgray">Amount</span>
                    <span className="text-xs lg:text-sm text-[#181818]">
                      ₦ {serviceAmount}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 lg:px-2">
                    <span className="text-sm text-lightgray">Service</span>
                    <span className="text-xs lg:text-sm text-[#181818]">
                      {serviceName}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 lg:px-2">
                    <span className="text-sm text-lightgray">
                      Transaction fee
                    </span>
                    <div className="flex gap-x-2">
                      <span className="text-xs lg:text-sm text-[#181818]">
                        ₦ 0.00
                      </span>
                      <span className="text-xs lg:text-sm line-through text-[#181818]">
                        ₦ 10.00
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between px-4 lg:px-2">
                    <span className="text-sm text-lightgray">
                      Payment Method
                    </span>
                    <div className="flex gap-x-2 items-center">
                      <span className="text-xs lg:text-sm text-[#181818]">
                        All
                      </span>
                      <MdOutlineKeyboardArrowLeft
                        size={15}
                        className="cursor-pointer rotate-180"
                      />
                    </div>
                  </div>

                  <div className="bg-[#dadada] mx-4  text-lightgray justify-between rounded-[10px] py-4 lg:py-6 px-4 flex items-center">
                    <div className="flex items-center lg:text-base text-sm gap-x-2">
                      <IoWalletSharp color="323b6d" />
                      <span className="text-[#181818] font-medium">Wallet</span>
                      <span>(₦ 125,000.00)</span>
                    </div>
                    <IoCheckmark color="323b6d" />
                  </div>
                  <div className="w-full pt-8 flex justify-center">
                    <Button className="w-5/6 mx-auto" onClick={handlePayment}>
                      Pay
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {success && !paymentSuccess && (
        <div className="fixed lg:static w-full right-0 left-0 bottom-0 lg:z-0 z-50">
          <div className="flex justify-center items-center w-full pt-14 pb-10 flex-col gap-y-6">
            <span className="lg:text-xl text-secondary px-4 font-medium">
              Enter Payment Pin
            </span>
            <PinInput
              length={4}
              initialValue=""
              secret
              secretDelay={100}
              onChange={(value, index) => {
                // handleChange(value);
              }}
              type="numeric"
              inputMode="number"
              style={{ padding: "10px" }}
              inputStyle={{ borderColor: "323b6d" }}
              inputFocusStyle={{ borderColor: "3745c0" }}
              onComplete={handleSent}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              onKeyDown={handleKeyDown}
            />
            <div className="text-xs bg-[#eee] py-1 text-[#181818] font-light w-full flex justify-center gap-x-2 text-center">
              <SiAdguard color="323b6d" />
              <span>Onepay Secure Numeric Key</span>{" "}
            </div>
          </div>
        </div>
      )}
      {paymentSuccess && (
        <div className="flex justify-center items-center w-full pt-14 pb-10 flex-col gap-y-6">
          <span className="lg:text-xl text-secondary px-4 font-medium">
            Payment Sent Succesfully
          </span>
          <span
            className="text-sm text-lightgray underline decoration-lightblue underline-offset-4 cursor-pointer"
            onClick={handleReceiptClick}
          >
            Click to view receipt
          </span>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
