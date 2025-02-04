import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { Home, Notifications } from "./_components/";
import { useDispatch, useSelector } from "react-redux";
import RequestModal from "./_components/home/_components/request-modal";
import ApprovePayment from "./_components/home/_components/approve-modal";
import OnepayTransfer from "./_components/home/_components/transfer-dashboard/_components/onepay-transfer";
import { onChildAdded, ref } from "firebase/database";
import { database } from "../../firebase/config";
import { toast } from "react-toastify";
import { setNotificationData } from "../../slice/dashboard";
import ShareCost from "./_components/home/_components/share-cost";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const showOnepay = useSelector((state) => state?.dashboard.states.showOnepay);
  const approvePayment = useSelector(
    (state) => state?.dashboard.states.approvePayment
  );
  const allNotification = useSelector(
    (state) => state?.dashboard.states.notificationData
  );
  const showNotification = useSelector(
    (state) => state?.dashboard.states.showNotification
  );
  const showRequestModal = useSelector(
    (state) => state?.dashboard.states.showRequestModal
  );
  const showShareCost = useSelector(
    (state) => state?.dashboard.states.showShareCost
  );
  const user = useSelector((state) => state.auth.states.user);

  useEffect(() => {
    setUserId(user.id);
  }, []);

  useEffect(() => {
    const notificationsRef = ref(database, "notifications");

    const listenForNotifications = () => {
      onChildAdded(notificationsRef, (snapshot) => {
        const notificationData = snapshot.val();
        if (notificationData.userId === userId) {
          toast.success("You have 1 new notification");
          dispatch(
            setNotificationData({ ...allNotification, notificationData })
          );
        }
      });
    };

    const unsubscribe = listenForNotifications();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);

  return (
    <Layout>
      {(showRequestModal || approvePayment || showShareCost) && (
        <div className="fixed bg-black bg-opacity-30 z-20 w-screen top-0 left-0 h-screen" />
      )}
      {showOnepay && <OnepayTransfer />}
      {showNotification && <Notifications />}
      {!(showOnepay || showNotification) && <Home />}
      {showRequestModal && (
        <div className="lg:absolute fixed z-50 animate-slide_up lg:top-[2%] overflow-auto bottom-0  right-0 left-0 lg:left-[35%]">
          <RequestModal />
        </div>
      )}
      {showShareCost && (
        <div className="lg:absolute fixed z-50 animate-slide_up lg:top-[20%] overflow-auto bottom-0  right-0 left-0 lg:left-[35%]">
          <ShareCost />
        </div>
      )}
      {approvePayment && (
        <div className="lg:absolute fixed z-50 animate-slide_up lg:top-[10%] overflow-auto bottom-0  right-0 left-0 lg:left-[35%]">
          <ApprovePayment />
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
