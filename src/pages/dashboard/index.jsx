import React from "react";
import { Layout } from "../../components";
import { Home } from "./_components/";
import { useSelector } from "react-redux";
import RequestModal from "./_components/home/_components/request-modal";
import OnepayTransfer from "./_components/home/_components/transfer-dashboard/_components/onepay-transfer";

const Dashboard = () => {
  const showOnepay = useSelector((state) => state?.dashboard.states.showOnepay);
  const showRequestModal = useSelector(
    (state) => state?.dashboard.states.showRequestModal
  );

  return (
    <Layout>
      {showRequestModal && (
        <div className="fixed bg-black bg-opacity-30 z-20 w-screen top-0 left-0 h-screen" />
      )}
      {showOnepay && <OnepayTransfer />}
      {!showOnepay && <Home />}
      {showRequestModal && <div className="lg:absolute fixed z-50 animate-slide_up lg:top-[20%] bottom-0 right-0 left-0 lg:left-[35%]"> <RequestModal /></div>}
    </Layout>
  );
};

export default Dashboard;
