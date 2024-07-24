import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotification } from "../../../../slice/dashboard";

const Notifications = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState([]);
  const allNotification = useSelector(
    (state) => state?.dashboard.states.notificationData
  );
  console.log(allNotification);
  useEffect(() => {
    setNotification(allNotification);
  }, []);

  const handleReset = () => {
    dispatch(setShowNotification(false));
  };
  return (
    <div className="relative">
      <div className="absolute gap-x-2 flex items-center">
        <MdOutlineKeyboardArrowLeft
          size={25}
          className="cursor-pointer"
          onClick={handleReset}
        />
        <span className="text-sm lg:text-base">Notifications</span>
      </div>
      <div className="pt-20 flex flex-col">
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
              className="flex w-full items-start justify-between px-6 bg-[#eee] cursor-pointer rounded-[10px] transition-all ease-in"
            >
              <div className="flex lg:flex-row flex-col w-full lg:items-center gap-y-2 lg:gap-x-3 py-2">
                {!value.notificationData.isRread && (
                  <div className="h-[8px] w-[9px] rounded-[50%] bg-lightblue" />
                )}
                <div className="flex w-full flex-col gap-y-2">
                  <span className="text-sm lg:text-base capitalize font-semibold text-[#181818]">
                    {value.notificationData.title}
                  </span>

                  <span className="lg:w-3/4 text-sm lg:text-base font-normal text-[#181818]">
                    {value.notificationData.reason}
                  </span>
                  <span className="lg:text-base text-xs ">Amount: ₦{value.notificationData.amount}</span>
                </div>
                <div className="flex flex-col lg:text-base text-xs lg:px-5">
                  <div>
                  <span className="mr-2">Sender:</span>
                  <span className="mr-1">
                    {value.notificationData.userDetails?.firstName}
                  </span>
                  <span>{value.notificationData.userDetails?.lastName}</span>
                  </div>
                  <div>
                  {value.notificationData.date}
                  </div>
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
