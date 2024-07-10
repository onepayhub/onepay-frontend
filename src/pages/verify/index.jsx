import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Verify = () => {
  const [details, setDetails] = useState({});
  const signupDetails = useSelector(
    (state) => state.signup.states.signupDetails
  );

  useEffect(() => {
    if (signupDetails) {
      setDetails(signupDetails);
    }
  }, []);

  return (
    <div className="relative">
      <Link
        to="/"
        className="font-semibold flex flex-col absolute pl-6 lg:pl-20 text-[#49529b] top-[4%] lg:top-[6%] lg:text-3xl"
      >
        <span>OnePay</span>
        <span className="text-sm">Verify your email address</span>
      </Link>
      <div className="lg:pl-20 px-5 pt-24 lg:pt-[25rem] text-sm text-[#696969]">
        <div className="flex gap-y-4 flex-col">
          <div className="flex items-center gap-x-1">
            <span>Hello</span>
            <span className="text-[#49529b] font-medium">
              {details?.firstName}
            </span>
            <span className="text-[#49529b] font-medium">
              {details?.lastName}
            </span>
          </div>
          <span>Your account has been created successfully</span>
          <div className="flex gap-y-4 flex-col items-start gap-x-1">
            <span>
              An email with a verification link has been sent to the email
              provided:
            </span>
            <span className="text-[#49529b] font-medium">{details?.email}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span>
              Please verify by clicking the verification link and then{" "}
            </span>{" "}
            <Link to="/prototype/signin" className="text-[#49529b] lg:text-lg font-medium">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
