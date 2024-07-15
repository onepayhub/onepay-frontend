import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { Button } from "../../../../../../../../components";

const InputAccount = ({ details, handleBankLists }) => {
  const [transferDetails, setTransferDetails] = useState({
    amount: "",
    remark: "",
  });
  const [error, setError] = useState("");
console.log(transferDetails)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransferDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleConfirm = () => {
    if (transferDetails.amount === "") {
      setError("Please enter the amount.");
    }
    if (transferDetails.amount !== "") {
      setError("");
      handleBankLists(true);
    }
  };

  return (
    <div className="pt-20">
      <div className="lg:w-5/6 mx-auto">
        <div className="flex flex-col gap-y-2 items-center">
          <div className="bg-[#bebebe] rounded-[50%] p-4">
            <GoPerson size={40} color="#fff" />
          </div>
          <div className="tracking-wider text-sm lg:text-xl text-[#181818]">
            <span>{details.first_name}</span> <span>{details.last_name}</span>
          </div>
          <span className="tracking-wider lg:text-lg">{details.account}</span>
        </div>

        <div className="flex gap-y-8 mt-10 px-16 flex-col justify-center items-center">
          <div className="flex flex-col gap-y-1 lg:w-3/4">
            <label htmlFor="amount" className="text-[#181818]">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              placeholder="10.00 - 6,000,000.00"
              className="px-5 py-4 rounded-[5px]"
              onChange={handleInputChange}
            />
            {error !== "" && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="flex flex-col gap-y-1 lg:w-3/4">
            <label htmlFor="remark" className="text-[#181818]">
              Remark
            </label>
            <input
              type="text"
              name="remark"
              placeholder="What's this for?"
              className="px-5 py-4 rounded-[5px]"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center w-full mt-16">
          {" "}
          <Button className="lg:w-3/4 w-full" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputAccount;
