import React from "react";
import { Layout } from "../../components";
import { Home } from "./_components/";
import { useSelector } from "react-redux";
import OnepayTransfer from "./_components/home/_components/transfer-dashboard/_components/onepay-transfer";

const Dashboard = () => {
  const showOnepay = useSelector((state) => state?.dashboard.states.showOnepay);

  return (
    <Layout>
      {showOnepay && <OnepayTransfer />}
      {!showOnepay && <Home />}
    </Layout>
  );
};

export default Dashboard;
