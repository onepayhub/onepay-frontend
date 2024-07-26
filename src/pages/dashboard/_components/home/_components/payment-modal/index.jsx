import React from "react";
import { SiAdguard } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentSuccess, setShowPayment } from "../../../../../../slice/dashboard";
import PinInput from "react-pin-input";

const PaymentModal = () => {
  const dispatch = useDispatch();
  const paymentSuccess = useSelector(
    (state) => state?.dashboard.states.paymentSuccess
  );
  const handleClose = () => {
    dispatch(setShowPayment(false));
  };
  const handleKeyDown = (e) => {
    const isValidKey = /^[0-9\b]+$/.test(e.key);
    if (!isValidKey) {
      e.preventDefault();
    }
  };
useEffect(() => {
  dispatch(setShowPayment(false));
}, [paymentSuccess])
const handleSent = () => {
  dispatch(setPaymentSuccess(true))
}
  return (
    <div className="bg-primary relative lg:w-[60%] flex flex-col rounded-[5px] overflow-auto lg:h-fit h-[40%]">
      <span
        className="text-xl cursor-pointer absolute right-10 top-2"
        onClick={handleClose}
      >
        x
      </span>
      <div className="flex justify-center items-center w-full pt-14 pb-10 flex-col gap-y-6">
        <span className="lg:text-xl text-secondary px-4 font-medium">
          Enter Payment Pin
        </span>
        <PinInput
          length={4}
          initialValue=""
          secret
          secretDelay={100}
          onChange={(value, index) => {}}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px" }}
          inputStyle={{ borderColor: "323b6d" }}
          inputFocusStyle={{ borderColor: "3745c0" }}
          onComplete={handleSent}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          onKeyDown={handleKeyDown}
        />
        <div className="text-xs bg-[#eee] py-1 text-[#181818] font-light w-full flex justify-center gap-x-2 text-center">
          <SiAdguard color="323b6d" />
          <span>Onepay Secure Numeric Key</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
