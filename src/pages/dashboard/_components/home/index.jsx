import React from "react";
import {
  AccountDashboard,
  NoticeDashboard,
  ServicesDashboard,
  TransferDashboard,
} from "./_components";
import { useSelector } from "react-redux";

const Home = () => {
  const paymentSuccess = useSelector(
    (state) => state?.dashboard.states.paymentSuccess
  );
  console.log(paymentSuccess)
  return (
    <div className="relative">
      {/* {paymentSuccess && (
        <div>
      )} */}
      <div className="h-[170vh] lg:h-screen">
        <AccountDashboard />
        <TransferDashboard />
        <ServicesDashboard />
        <NoticeDashboard />
      </div>
    </div>
  );
};

export default Home;
