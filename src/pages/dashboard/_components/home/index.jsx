import React from "react";
import { AccountDashboard, ServicesDashboard, TransferDashboard } from "./_components";

const Home = () => {
  return (
    <div>
      <AccountDashboard />
      <TransferDashboard />
      <ServicesDashboard />
    </div>
  );
};

export default Home;
