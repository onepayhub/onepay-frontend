import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { Button } from "../../../../../../../../components";
import { setTransferDetails } from "../../../../../../../../slice/dashboard";
import { useDispatch } from "react-redux";

const InputAccount = ({ details, handleBankLists }) => {
  const dispatch = useDispatch()
  const [transferDetails, setDetails] = useState({
    amount: "",
    remark: "",
  });
  const [error, setError] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleConfirm = () => {
    if (transferDetails.amount === "") {
      setError("Please enter the amount.");
      return;
    }
    else {
      setError("");
      dispatch(setTransferDetails(transferDetails))
      handleBankLists(true);
    }
  };

  return (
    <div className="lg:pt-20 pt-16 h-screen lg:h-full">
      <div className="lg:w-5/6 mx-auto w-full">
        <div className="flex flex-col gap-y-2 items-center">
          <div className="bg-[#bebebe] rounded-[50%] p-4">
            <GoPerson size={40} color="#fff" />
          </div>
          <div className="tracking-wider text-sm lg:text-xl text-[#181818]">
            <span>{details.first_name}</span> <span>{details.last_name}</span>
          </div>
          <span className="tracking-wider lg:text-lg">{details.account}</span>
        </div>

        <div className="flex gap-y-8 mt-6 lg:px-16 flex-col justify-center items-center">
          <div className="flex flex-col gap-y-2 w-full lg:w-3/4">
            <label htmlFor="amount" className="text-[#181818] text-sm lg:text-base">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              placeholder="10.00 - 5,000,000.00"
              className="px-2 w-full py-2 lg:py-4 border placeholder:text-sm border-[#5f5f5f] rounded-[5px]"
              onChange={handleInputChange}
            />
            {error !== "" && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="flex flex-col w-full gap-y-2 lg:w-3/4">
            <label htmlFor="remark" className="text-[#181818] text-sm lg:text-base">
              Remark
            </label>
            <input
              type="text"
              name="remark"
              placehoder="What's this for?"
              className="px-2 py-2 lg:py-4 w-full border border-[#5f5f5f] rounded-[5px]"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center lg:w-2/4 mx-auto mt-10">
          {" "}
          <Button className="w-full" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputAccount;
