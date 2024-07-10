import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../../components";

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
      <Link to='/' className="font-semibold flex flex-col absolute pl-20 text-[#49529b] top-[6%] lg:text-3xl">
        <span>OnePay</span>
        <span className="text-sm">Enjoy stress free transfers</span>
      </Link>
      <div className="pl-20 pt-[25rem] text-sm lg:text-base text-[#696969]">
        <div className="flex gap-y-4 flex-col">
          <div className="flex items-center gap-x-1">
            <span>Well done</span>
            <span className="text-[#49529b] font-medium">
              {details?.firstName}
            </span>
            <span className="text-[#49529b] font-medium">
              {details?.lastName}
            </span>
          </div>
          <span>Your account has been verified successfully</span>
          <div className="flex flex-col items-start gap-y-5">
            <span>
              We look foward to providing you with the best experience.{" "}
            </span>

            <span className="text-[#49529b] font-medium">
              Welcome to OnePay!
            </span>
          </div>
          <Button className="w-fit mt-16">
            <Link to="/prototype/login">Proceed to login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
