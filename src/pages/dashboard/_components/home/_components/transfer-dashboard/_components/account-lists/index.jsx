import React, { useEffect, useState } from "react";
import {
  AccessLogo,
  FbLogo,
  FcmbLogo,
  Fidelity,
  GtbankLogo,
  MpLogo,
  OpayLogo,
} from "../../../../../../../../constants/images";
import { Button } from "../../../../../../../../components";
import { useSelector } from "react-redux";
import { IoWalletSharp, IoCheckmark } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const AccountLists = () => {
  const [details, setAccountDetails] = useState({});
  const [selected, setSelected] = useState({});
  const [amountDetails, setAmountDetails] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const accountDetails = useSelector(
    (state) => state?.dashboard.states.accountDetails
  );
  const transferDetails = useSelector(
    (state) => state?.dashboard.states.transferDetails
  );

  const handleSelected = (bank, number) => {
    setShowPayment(true);
    setSelected({
      bankName: bank,
      account: number,
    });
  };
  useEffect(() => {
    setAccountDetails(accountDetails);
    setAmountDetails(transferDetails);
  }, []);

  const bankName = `text-xs lg:text-sm`;
  const accountNo = `text-sm lg:text-base`;
  return (
    <div className="pt-20 w-full lg:pl-4 flex lg:flex-row flex-col gap-x-10 h-screen lg:h-full">
      <div className="w-full flex lg:w-1/2 flex-col gap-y-4">
        <span className="text-lightgray">Select Account</span>

        <div
          className="flex w-full px-5 items-start bg-[#eee] py-3 lg:py-6 justify-between cursor-pointer transition-all hover:scale-95 ease-in"
          onClick={() => handleSelected("Onepay Wallet", details?.account)}
        >
          <div className="flex flex-col gap-y-1">
            <span className="text-[#181818] text-sm lg:text-base uppercase">
              {details?.first_name} {details?.last_name}
            </span>
            <div className="flex items-center text-[#8b8b8b] gap-x-2">
              <span className={accountNo}>{details?.account}</span>
              <span className={bankName}>Onepay Wallet</span>
            </div>
            <span></span>
          </div>
          <div className="">
            <span className="text-3xl">O</span>
            {/* <img src={GtbankLogo} alt="gtb" className="w-[30px] lg:w-[50px]" /> */}
          </div>
        </div>
        <div
          className="flex w-full px-5 items-start bg-[#eee] py-3 lg:py-6 justify-between cursor-pointer transition-all hover:scale-95 ease-in"
          onClick={() => handleSelected("Guaranty Trust Bank", "0561254922")}
        >
          <div className="flex flex-col gap-y-1">
            <span className="text-[#181818] text-sm lg:text-base uppercase">
              {details?.last_name} {details?.first_name}
            </span>
            <div className="flex items-center text-[#8b8b8b] gap-x-2">
              <span className={accountNo}>0561254922</span>
              <span className={bankName}>GTBank</span>
            </div>
            <span></span>
          </div>
          <div className="">
            <img src={GtbankLogo} alt="gtb" className="w-[30px] lg:w-[50px]" />
          </div>
        </div>

        <div
          className="flex px-5 w-full items-start bg-[#eee] py-3 lg:py-6 justify-between cursor-pointer transition-all hover:scale-95 ease-in"
          onClick={() => handleSelected("Access Bank", "0733528954")}
        >
          <div className="flex flex-col gap-y-1">
            <span className="text-[#181818] text-sm lg:text-base uppercase">
              {details?.first_name} {details?.last_name}
            </span>
            <div className="flex items-center text-[#8b8b8b] gap-x-2">
              <span className={accountNo}>0733528954</span>
              <span className={bankName}>Access Bank</span>
            </div>
            <span></span>
          </div>
          <div className="">
            <img src={AccessLogo} alt="gtb" className="w-[30px] lg:w-[50px]" />
          </div>
        </div>
        <div
          className="flex w-full px-5 items-start bg-[#eee] py-3 lg:py-6 justify-between cursor-pointer transition-all hover:scale-95 ease-in"
          onClick={() => handleSelected("FCMB", "0231487534")}
        >
          <div className="flex flex-col gap-y-1">
            <span className="text-[#181818] text-sm lg:text-base uppercase">
              {details?.last_name} {details?.first_name}
            </span>
            <div className="flex items-center text-[#8b8b8b] gap-x-2">
              <span className={accountNo}>0231487534</span>
              <span className={bankName}>FCMB</span>
            </div>
            <span></span>
          </div>
          <div className="">
            <img src={FcmbLogo} alt="gtb" className="w-[30px] lg:w-[50px]" />
          </div>
        </div>
        <div
          className="flex w-full px-5 items-start bg-[#eee] py-3 lg:py-6 justify-between cursor-pointer transition-all hover:scale-95 ease-in"
          onClick={() => handleSelected("First Bank", "0423895612")}
        >
          <div className="flex flex-col gap-y-1">
            <span className="text-[#181818] text-sm lg:text-base uppercase">
              {details?.first_name} {details?.last_name}
            </span>
            <div className="flex items-center text-[#8b8b8b] gap-x-2">
              <span className={accountNo}>0423895612</span>
              <span className={bankName}>First Bank</span>
            </div>
            <span></span>
          </div>
          <div className="">
            <img src={FbLogo} alt="gtb" className="w-[30px] lg:w-[50px]" />
          </div>
        </div>
        <div
          className="flex w-full px-5 items-start bg-[#eee] py-3 lg:py-6 justify-between cursor-pointer transition-all hover:scale-95 ease-in"
          onClick={() => handleSelected("Moniepoint", "0194678223")}
        >
          <div className="flex flex-col gap-y-1">
            <span className="text-[#181818] text-sm lg:text-base uppercase">
              {details?.first_name} {details?.last_name}
            </span>
            <div className="flex items-center text-[#8b8b8b] gap-x-2">
              <span className={accountNo}>0194678223</span>
              <span className={bankName}>Moniepoint</span>
            </div>
            <span></span>
          </div>
          <div className="">
            <img src={MpLogo} alt="gtb" className="w-[30px] lg:w-[50px]" />
          </div>
        </div>
        <div
          className="flex w-full px-5 items-start bg-[#eee] py-3 lg:py-6 justify-between cursor-pointer transition-all hover:scale-95 ease-in"
          onClick={() => handleSelected("OPay", "7033939939")}
        >
          <div className="flex flex-col gap-y-1">
            <span className="text-[#181818] text-sm lg:text-base uppercase">
              {details?.last_name} {details?.first_name}
            </span>
            <div className="flex items-center text-[#8b8b8b] gap-x-2">
              <span className={accountNo}>7033939939</span>
              <span className={bankName}>Opay</span>
            </div>
            <span></span>
          </div>
          <div className="">
            <img src={OpayLogo} alt="gtb" className="w-[30px] lg:w-[50px]" />
          </div>
        </div>
      </div>
      {showPayment && (
        <div className="relative lg:w-1/2">
          {" "}
          <div
            className="fixed lg:absolute lg:right-10 right-5 cursor-pointer z-50 lg:bottom-0 lg:top-0 bottom-[33rem] top0 lg:text-xl"
            onClick={() => setShowPayment(false)}
          >
            X
          </div>{" "}
          <div className="lg:w-full lg:animate-slide_right animate-slide_up lg:mx-auto bg-primary lg:bg-transparent lg:rounded-none left-0 right-0 rounded-[20px] lg:static w-full fixed bottom-[4.9rem] py-10 flex justify-start items-start">
            <div className="flex gap-y-2 flex-col w-full">
              <div className="flex gap-y-3 flex-col">
                <div className="font-normal text-[#181818] flex items-center justify-center text-xl lg:text-2xl pb-10">
                  <span className="lg:text-xl text-base mx-1">₦</span>
                  {amountDetails.amount}
                </div>
                <div className="flex justify-between px-4 lg:px-2">
                  <span className="text-sm text-lightgray">Bank</span>
                  <span className="text-xs lg:text-sm text-[#181818]">
                    {selected?.bankName}
                  </span>
                </div>
                <div className="flex justify-between px-4 lg:px-2">
                  <span className="text-sm lg:text-sm text-lightgray">
                    Account Number
                  </span>
                  <span className="text-xs lg:text-sm text-[#181818]">
                    {selected?.account}
                  </span>
                </div>
                <div className="flex justify-between px-4 lg:px-2">
                  <span className="text-sm text-lightgray">Name</span>
                  <span className="text-xs lg:text-sm text-[#181818]">
                    {details?.last_name} {details?.first_name}
                  </span>
                </div>
                <div className="flex justify-between px-4 lg:px-2">
                  <span className="text-sm text-lightgray">Amount</span>
                  <span className="text-xs lg:text-sm text-[#181818]">
                    ₦ {amountDetails.amount}
                  </span>
                </div>
                <div className="flex justify-between px-4 lg:px-2">
                  <span className="text-sm text-lightgray">
                    Transaction fee
                  </span>
                  <span className="text-xs lg:text-sm text-[#181818]">
                    ₦ 0.00
                  </span>
                </div>
                <div className="flex justify-between px-4 lg:px-2">
                  <span className="text-sm text-lightgray">Payment Method</span>
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
                  <Button className="w-5/6 mx-auto">Pay</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountLists;
