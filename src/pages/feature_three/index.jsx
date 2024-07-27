import React from "react";
import { Link } from "react-router-dom";

const FeatureThree = () => {
  return (
    <div className=" md:container container mx-auto py-10 lg:py-20">
      <div className="lg:w-3/4 px-10">
        <Link
          to="/"
          className="font-semibold flex flex-col text-[#49529b] lg:text-3xl"
        >
          <img src="/logo.png" className="w-[170px] m-[-2rem] mb-[-4rem]" alt="" />
          <span className="text-sm">Request Payment</span>
        </Link>
        <div className=" lg:text-base text-sm flex pt-10 lg:pt-16  flex-col gap-y-5">
          <span className="lg:text-2xl text-base font-medium text-secondary">
            Seamlessly Request, Schedule, and Approve Payments
          </span>
          <span>
            OnePay platform offers a seamless solution for requesting and
            approving payments, simplifying the process of initiating and
            authorizing fund transfers. Users can effortlessly request money
            from another account (intended user receives a notification) by specifying the desired bank amount and
            providing any necessary details, streamlining the transfer process
            and enhancing convenience.
          </span>
          <span>
            This feature is particularly beneficial for scenarios where
            individuals need to request funds from others, whether for personal
            reasons, group expenses, or collaborative projects. Users can
            specify the exact amount needed, provide essential information such
            as bank details or payment purpose, and send out requests with ease.
          </span>
          <span>
            Moreover, the ability to approve payments adds an extra layer of
            control and security to the transaction process. Recipients can
            review incoming payment requests, verify the details, and approve
            the transfer, ensuring that funds are transferred accurately and
            securely.
          </span>
          <span>
            By enabling seamless request and approval of payments, our platform
            facilitates efficient fund transfers, making it ideal for various
            situations where requesting money is necessary. Whether for personal
            use or group activities, this feature simplifies the process of
            asking for funds and ensures a smooth and hassle-free transfer
            experience for all parties involved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureThree;
