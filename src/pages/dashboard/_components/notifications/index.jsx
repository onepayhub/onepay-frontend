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
console.log(allNotification)
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
      <div className="pt-20 flex flex-col items-center justify-center">
        <div>
          <span>
            {notification.length === 0 && (
              <span>You have no notifications</span>
            )}
          </span>
        </div>
<div>
  <div>
    <span></span>
  </div>
</div>
      </div>
    </div>
  );
};

export default Notifications;
