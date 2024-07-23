import React from "react";
import { AccountDashboard, ServicesDashboard, TransferDashboard } from "./_components";

const Home = () => {
  return (
    <div className="h-screen lg:h-full">
      <AccountDashboard />
      <TransferDashboard />
      <ServicesDashboard />
    </div>
  );
};

export default Home;
