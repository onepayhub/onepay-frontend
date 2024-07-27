import React from "react";
import { Link } from "react-router-dom";

const FeatureOne = () => {
  return (
    <div className=" md:container container mx-auto py-10 lg:py-20">
      <div className="lg:w-3/4 px-10">
        <Link
          to="/"
          className="font-semibold flex flex-col text-[#49529b] lg:text-3xl"
        >
          <span>OnePay</span>
          <span className="text-sm">Share costs</span>
        </Link>
        <div className=" lg:text-base text-sm flex pt-10 lg:pt-16  flex-col gap-y-5">
          <span className="lg:text-2xl text-base font-medium text-secondary">
            Share Expenses Effortlessly share expenses and multiply your savings
            with another user.
          </span>
          <span>
            Sharing expenses can be a powerful way to manage costs and boost
            savings collaboratively. With our platform, sharing expenses becomes
            effortless, allowing users to magnify their savings by pooling
            resources with another user.
          </span>
          <span>
            In scenarios where there might not be sufficient cash in your
            wallet, the platform facilitates sharing the costs of different
            services such as airtime, data bundles, TV subscriptions, and more
            with another user. This sharing process involves sending a request
            directly to the recipient's account, (intended user receives a notification) specifying the percentage of
            the cost you require assistance with.
          </span>
          <span>
            This feature not only fosters financial cooperation but also
            enhances flexibility, enabling users to manage expenses collectively
            and efficiently. By seamlessly dividing expenses and resources,
            users can navigate financial challenges more effectively and make
            the most of their available funds.
          </span>
          <span>
            In essence, OnePay empowers users to share financial burdens,
            leverage shared resources, and ultimately multiply their savings
            through a collaborative approach to managing expenses.
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureOne;
