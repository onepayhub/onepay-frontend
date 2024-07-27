import React from "react";
import { Link } from "react-router-dom";

const FeatureTwo = () => {
  return (
    <div className=" md:container container mx-auto py-10 lg:py-20">
      <div className="lg:w-3/4 px-10">
        <Link
          to="/"
          className="font-semibold flex flex-col text-[#49529b] lg:text-3xl"
        >
          <span>OnePay</span>
          <span className="text-sm">One ID for all</span>
        </Link>
        <div className=" lg:text-base text-sm flex pt-10 lg:pt-16  flex-col gap-y-5">
          <span className="lg:text-2xl text-base font-medium text-secondary">
          Simplifies transfers by using a unique ID, which is generated from your phone number <br /> <span className="text-sm">(E.g: 7033936609)</span>
          </span>
          <span>
            Our system streamlines the transfer process by introducing a
            distinctive identification system for selecting banks. This
            innovative approach eradicates the necessity to memorize numerous
            account numbers, enhancing the efficiency and security of
            transactions.
          </span>
          <span>
            By utilizing unique IDs for bank selection, users can easily
            identify and connect with their desired financial institutions
            without the hassle of recalling intricate account details. This
            simplification not only saves time but also reduces the likelihood
            of errors during transfers.
          </span>
          <span>
            With this seamless method, users can initiate transfers swiftly and
            securely, knowing that the system's unique ID system ensures
            accurate routing of funds to the intended recipient's account. This
            feature not only enhances user experience but also adds a layer of
            convenience and reliability to the transfer process.
          </span>
          <span>
            In essence, OnePay platform revolutionizes the way transfers are
            conducted by introducing a user-friendly and secure method that
            simplifies bank selection and eliminates the burden of remembering
            multiple account numbers.
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureTwo;
