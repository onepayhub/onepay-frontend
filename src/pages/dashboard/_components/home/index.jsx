import React from "react";
import {
  AccountDashboard,
  NoticeDashboard,
  ServicesDashboard,
  TransferDashboard,
} from "./_components";

const Home = () => {
  return (
    <div className="h-[170vh] lg:h-screen">
      <AccountDashboard />
      <TransferDashboard />
      <ServicesDashboard />
      <NoticeDashboard />
    </div>
  );
};

export default Home;
