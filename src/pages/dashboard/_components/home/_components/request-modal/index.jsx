import React from "react";
import { useDispatch } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { setShowRequestModal } from "../../../../../../slice/dashboard";
import { Button } from "../../../../../../components";

const RequestModal = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setShowRequestModal(false));
  };
  return (
    <div className="bg-primary lg:w-[60%] lg:px-4 px-2 flex flex-col rounded-[5px]">
      <span
        className="text-xl cursor-pointer text-right lg:pt-4 pr-3 lg:mr-0"
        onClick={handleCloseModal}
      >
        x
      </span>
      <div className="flex py-2 pb-10 px-4 flex-col gap-y-6">
        <span className="lg:text-xl text-secondary font-medium">
          Request payment
        </span>
        <div className="lg:pr-20 flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="" className="text-[#181818] text-xs lg:text-sm">
              Recepient's Id
            </label>
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder="703393RSWER"
              className="px-4 py-2 border uppercase text-sm lg:text-base border-[#5F5F5F] rounded-[5px]"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="" className="text-[#181818] text-xs lg:text-sm">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder="Amount"
              className="px-4 py-2 text-sm lg:text-base border border-[#5F5F5F] rounded-[5px]"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="" className="text-[#181818] text-xs lg:text-sm">
              Description / Reason
            </label>
            <textarea
              type="text"
              name="amount"
              id="amount"
              placeholder="Brief description on reason for request"
              className="px-4 py-2 text-sm lg:text-base border border-[#5F5F5F] rounded-[5px]"
            />
          </div>
          <div className="flex flex-col gap-y-2 text-sm">
            <label htmlFor="document" className="text-[#181818] space-y-2">
              <span className="text-xs lg:text-sm">
                Relevant Document{" "}
                <span className="text-lightgray">(optional)</span>
              </span>
              <div className="border text-xs border-[#5F5F5F] border-dashed py-4 flex gap-y-2 flex-col items-center justify-center cursor-pointer rounded-[5px]">
                <FiUpload />
                <span>Upload</span>
              </div>
              <input
                type="file"
                name="document"
                className="hidden"
                id="document"
              />
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" name="" id="" />
            <span className="text-lightgray text-xs">
              I confirm that the information provided is accurate and I agree to
              the{" "}
              <span className="text-lightblue underline underline-offset-[3px] cursor-pointer">
                Terms and Conditions
              </span>{" "}
              of the payment request or debt owed.
            </span>
          </div>
          <div className="flex items-center gap-x-4 pt-4">
            <Button
              className="w-full"
              backgroundColor="transparent"
              textColor="#3745c0"
            >
              Reset
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
