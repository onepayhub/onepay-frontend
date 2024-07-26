import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApprovePayment } from "../../../../../../slice/dashboard";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoCheckmark, IoWalletSharp } from "react-icons/io5";
import { Button } from "../../../../../../components";
import {
  AccessLogo,
  FbLogo,
  Fidelity,
  GtbankLogo,
} from "../../../../../../constants/images";

const ApprovePayment = () => {
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const dispatch = useDispatch();
  const allNotifications = useSelector(
    (state) => state?.dashboard.states.notificationData
  );
  const notificationId = useSelector(
    (state) => state?.dashboard.states.selectedNotificationId
  );
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [index, setIndex] = useState(1);
  const [showBanks, setShowBanks] = useState(false);
  const [bankName, setBankName] = useState("Select Bank");
  const [error, setError] = useState("");

  useEffect(() => {
    if (allNotifications && allNotifications.length > 0) {
      const filtered = allNotifications
        .map((notification) => notification.notificationData)
        .filter((notification) => notification.id === notificationId);
      setFilteredNotifications(filtered);
    }
  }, [allNotifications, notificationId]);

  useEffect(() => {
    if (bankName !== "Select Bank") {
      setShowBanks(false);
    }
  }, [bankName]);
  const handleBankClick = () => {
    setShowBanks(!showBanks);
  };
  const handleCloseModal = () => {
    dispatch(setApprovePayment(false));
  };
  const handleNext = () => {
    if (agreeTerms) {
      setIndex((prevIndex) => prevIndex + 1);
      setError("");
    } else {
      setError("Please check the box, if you have read and understand fully");
    }
  };
  const handlePrevious = () => {
    setIndex((prevIndex) => prevIndex - 1); // Increment index on "Next" button click
  };
  const handleSetBankName = (value) => {
    setBankName(value);
  };
  console.log(filteredNotifications);
  return (
    <div className="bg-primary lg:w-[60%] lg:px-4 px-2 flex flex-col rounded-[5px] overflow-auto lg:h-fit h-[30vh]">
      <div className="flex relative pt-14 pb-10 px-4 flex-col gap-y-6">
        <span className="lg:text-xl text-secondary font-medium">
          Approve payment
        </span>
        <span
          className="text-xl cursor-pointer hidden lg:block right-10 top-20 lg:top-6 z-20 absolute"
          onClick={handleCloseModal}
        >
          x
        </span>

        <div className="flex flex-col gap-y-6">
          <div className="lg:w-full lg:mx-auto bg-primary lg:bg- lg:rounded-none left-0 right-0 rounded-[20px] lg:static w-full fixed bottom-[.9rem] py-10 flex justify-start items-start">
            <div className="flex gap-y-2 flex-col w-full">
              {index === 1 &&
                filteredNotifications.map((notification) => (
                  <div
                    className="flex gap-y-3 flex-col relative"
                    key={notification.id}
                  >
                    <span
                      className="text-xl cursor-pointer block lg:hidden right-6 lg:right-10 top-[-5%] lg:top-6 z-20 absolute"
                      onClick={handleCloseModal}
                    >
                      x
                    </span>
                    <div className="font-normal text-[#181818] flex items-center justify-center text-xl lg:text-2xl pb-10">
                      <span className="lg:text-xl text-base mx-1">₦</span>
                      {notification.amount}
                    </div>
                    <div className="flex justify-between px-4 lg:px-2">
                      <span className="text-sm text-lightgray">Bank</span>
                      <span className="text-xs lg:text-sm text-[#181818]">
                        {notification.bank}
                      </span>
                    </div>
                    <div className="flex justify-between px-4 lg:px-2">
                      <span className="text-sm lg:text-sm text-lightgray">
                        Account Number
                      </span>
                      <span className="text-xs lg:text-sm text-[#181818]">
                        {notification.userDetails.uuid}
                      </span>
                    </div>
                    <div className="flex justify-between px-4 lg:px-2">
                      <span className="text-sm text-lightgray">Name</span>
                      <span className="text-xs lg:text-sm text-[#181818]">
                        {notification.userDetails?.lastName}{" "}
                        {notification.userDetails?.firstName}
                      </span>
                    </div>
                    <div className="flex justify-between px-4 lg:px-2">
                      <span className="text-sm text-lightgray">Amount</span>
                      <span className="text-xs lg:text-sm text-[#181818]">
                        ₦ {notification.amount}
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
                    <div className="flex justify-between px-4 lg:px-2">
                      <span className="text-sm text-lightgray">Reason</span>
                      <div className="flex gap-x-2 items-center">
                        <span className="text-xs lg:text-sm text-[#181818]">
                          {notification.reason.length > 10
                            ? `${notification.reason.slice(0, 30)}...`
                            : notification.reason}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-1 px-4 lg:px-2">
                      <div className="flex items-center gap-x-2">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          id="agreeTerms"
                          className="cursor-pointer"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.value)}
                        />
                        <span className="text-lightgray text-xs">
                          I have confirmed that the above information is
                          accurate and I agree to the{" "}
                          <span className="text-lightblue underline underline-offset-[3px] cursor-pointer">
                            Terms and Conditions
                          </span>{" "}
                          of the payment request or debt owed.
                        </span>
                      </div>
                      {error && (
                        <span className="text-xs text-[#e62e2e]">{error}</span>
                      )}
                    </div>
                    <div className="bg-[#dadada] mx-4  text-lightgray justify-between rounded-[10px] py-4 lg:py-6 px-4 flex items-center">
                      <div className="flex items-center lg:text-base text-sm gap-x-2">
                        <IoWalletSharp color="323b6d" />
                        <span className="text-[#181818] font-medium">
                          Wallet
                        </span>
                        <span>(₦ 125,000.00)</span>
                      </div>
                      <IoCheckmark color="323b6d" />
                    </div>
                    <div className="w-full pt-8 flex justify-center">
                      <Button className="w-5/6 mx-auto" onClick={handleNext}>
                        Next
                      </Button>
                    </div>
                  </div>
                ))}

              {index === 2 && (
                <div className="w-full px-6 h-full">
                  {filteredNotifications.map((value, i) => (
                    <div
                      key={i}
                      className="flex w-full flex-col gap-y-4 lg:gap-y-6 relative h-[30vh] overflow-auto"
                    >
                      <span
                        className="text-xl cursor-pointer block lg:hidden right-2 lg:right-10 top-[5%] lg:top-6 z-20 absolute"
                        onClick={handleCloseModal}
                      >
                        x
                      </span>
                      <div className="flex flex-col gap-y-1">
                        <span className="text-xs lg:text-sm text-lightgray">
                          Account Id
                        </span>
                        <input
                          type="number"
                          className="py-2 px-4 border border-[#5f5f5f] text-sm lg:text-base rounded-[5px] w-5/6"
                          value={value.recipientId}
                          name="id"
                          contentEditable={false}
                        />
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <span className="text-xs lg:text-sm text-lightgray">
                          Amount
                        </span>
                        <input
                          type="number"
                          className="py-2 px-4 border border-[#5f5f5f] text-sm lg:text-base rounded-[5px] w-5/6"
                          value={`${value.amount}`}
                          name="id"
                          contentEditable={false}
                        />
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <span className="text-xs lg:text-sm text-lightgray">
                          Select the preferred bank
                        </span>
                        <div
                          className="w-5/6 flex items-center py-2 px-4 border rounded-[5px] cursor-pointer border-lightgray"
                          onClick={handleBankClick}
                        >
                          <span className="text-lightgray lg:text-base text-sm font-medium w-full">
                            {bankName}
                          </span>
                          <MdOutlineKeyboardArrowLeft
                            size={20}
                            className={`rotate-180 ${
                              showBanks && "-rotate-90 transition-all ease-in"
                            }`}
                          />
                        </div>
                      </div>
                      {showBanks && (
                        <div className="absolute h-[50vh] overflow-auto w-full top-[8.5rem] animate-slide_up lg:w-5/6">
                          <div className="bg-[#f5f5f5] w-5/6 text-sm lg:text-base flex flex-col px-2 py-3 rounded-[5px]">
                            <div
                              className="flex items-center gap-x-4 py-2 lg:py-3 cursor-pointer"
                              onClick={() => handleSetBankName("Access Bank")}
                            >
                              <img
                                src={AccessLogo}
                                alt="bank"
                                className="w-[30px]"
                              />
                              <span>Access Bank</span>
                            </div>
                            <hr color="#5f5f5f" />

                            <div
                              className="flex items-center gap-x-4 py-2 lg:py-3  cursor-pointer"
                              onClick={() =>
                                handleSetBankName("Guaranty Trust Bank")
                              }
                            >
                              <img
                                src={GtbankLogo}
                                alt="bank"
                                className="w-[30px]"
                              />
                              <span>Guaranty Trust Bank</span>
                            </div>
                            <hr color="#5f5f5f" />

                            <div
                              className="flex items-center gap-x-4 py-2 lg:py-3  cursor-pointer"
                              onClick={() => handleSetBankName("Fidelity Bank")}
                            >
                              <img
                                src={Fidelity}
                                alt="bank"
                                className="w-[30px]"
                              />
                              <span>Fidelity Bank</span>
                            </div>
                            <hr color="#5f5f5f" />

                            <div
                              className="flex items-center text-[#181818] gap-x-4 py-2 lg:py-3  cursor-pointer"
                              onClick={() => handleSetBankName("First Bank")}
                            >
                              <img
                                src={FbLogo}
                                alt="bank"
                                className="w-[30px]"
                              />
                              <span>First Bank</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex pt-16 gap-x-2 items-center w-full lg:justify-center">
                    <Button onClick={handlePrevious} className="w-[150px]">
                      Prev
                    </Button>
                    <Button onClick={handlePrevious} className="w-[150px]">
                      Approve
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovePayment;
