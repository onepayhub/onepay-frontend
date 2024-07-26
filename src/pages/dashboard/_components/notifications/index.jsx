import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setApprovePayment,
  setSelectedNotificationId,
  setShowNotification,
} from "../../../../slice/dashboard";
import { Button } from "../../../../components";

const Notifications = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState([]);
  const allNotification = useSelector(
    (state) => state?.dashboard.states.notificationData
  );
  useEffect(() => {
    setNotification(allNotification);
  }, []);
  const handleApproveClick = (value) => {
    dispatch(setApprovePayment(true));
    dispatch(setSelectedNotificationId(value));
  };
  const handleReset = () => {
    dispatch(setShowNotification(false));
  };
  return (
    <div className="relative pb-20 lg:h-full">
      <div className="absolute gap-x-2 flex items-center">
        <MdOutlineKeyboardArrowLeft
          size={25}
          className="cursor-pointer"
          onClick={handleReset}
        />
        <span className="text-sm lg:text-base">Notifications</span>
      </div>
      <div className="lg:pt-20 pt-16 flex flex-col">
        <div className="flex items-center justify-center">
          <span>
            {notification.length === 0 && (
              <span>You have no notifications</span>
            )}
          </span>
        </div>
        <div className="flex flex-col gap-y-4 animate-slide_right">
          {allNotification.map((value, i) => (
            <div
              key={i}
              className="flex w-full items-start justify-between px-6 bg-[#eee] cursor-pointer rounded-[12px] transition-all ease-in"
            >
              <div className="flex lg:flex-row flex-col w-full lg:items-center gap-y-2 lg:gap-x-3 py-3">
                {!value.notificationData.isRread && (
                  <div className="h-[8px] w-[9px] rounded-[50%] bg-lightblue" />
                )}
                <div className="flex w-full flex-col gap-y-1 lg:gap-y-2">
                  <span className="text-sm lg:text-base capitalize font-semibold text-[#181818]">
                    {value.notificationData.title}
                  </span>

                  <span className="lg:w-3/4 text-xs capitalize lg:text-base font-normal text-[#181818]">
                    {value.notificationData.reason.length > 20 ? `${value.notificationData.reason.slice(0, 10)}...` : notification.reason}
                  </span>
                  <span className="lg:text-base text-xs ">
                    Amount: ₦{value.notificationData.amount}
                  </span>
                  <Button
                    className="w-fit !text-sm lg:block hidden"
                    backgroundColor="transparent"
                    textColor="#3745c0"
                    onClick={() => handleApproveClick(value.notificationData.id)}
                  >
                    Approve payment
                  </Button>
                </div>
                <div className="flex flex-col lg:text-base text-xs lg:px-5">
                  <div>
                    <span className="mr-2">Sender:</span>
                    <span className="mr-1">
                      {value.notificationData.userDetails?.firstName}
                    </span>
                    <span>{value.notificationData.userDetails?.lastName}</span>
                  </div>
                  <span>ID: {value.notificationData.userDetails?.uuid}</span>
                  <span>Preferred Bank: {value.notificationData.bank}</span>
                  <div>Date: {value.notificationData.date}</div>
                  <Button
                    className="w-full mt-4 !text-xs lg:hidden block"
                    backgroundColor="transparent"
                    textColor="#3745c0"
                    onClick={() => handleApproveClick(value.notificationData.id)}
                  >
                    Approve payment
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
