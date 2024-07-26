import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApprovePayment } from "../../../../../../slice/dashboard";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoCheckmark, IoWalletSharp } from "react-icons/io5";
import { Button } from "../../../../../../components";

const ApprovePayment = () => {
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const dispatch = useDispatch();
  const allNotifications = useSelector((state) => state?.dashboard.states.notificationData);
  const notificationId = useSelector((state) => state?.dashboard.states.selectedNotificationId);

  useEffect(() => {
    if (allNotifications && allNotifications.length > 0) {
      const filtered = allNotifications.map(notification => notification.notificationData).filter(notification => notification.id === notificationId);
      setFilteredNotifications(filtered);
    }
  }, [allNotifications, notificationId]);

  const handleCloseModal = () => {
    dispatch(setApprovePayment(false));
  };

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
                {filteredNotifications.map((notification) => (
                  <div className="flex gap-y-3 flex-col relative" key={notification.id}>
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
                        {notification.recipientId}
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
                        {notification.reason.length > 10 ? `${notification.reason.slice(0, 30)}...` : notification.reason}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-1 px-4 lg:px-2">
                      <div className="flex items-center gap-x-2">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          id="agreeTerms"
                          // checked={details.agreeTerms}
                          // onChange={handleForm}
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
                      <Button className="w-5/6 mx-auto">Approve payment</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

  
        </div>
      </div>
    </div>
  );
};

export default ApprovePayment;
