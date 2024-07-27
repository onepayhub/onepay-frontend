import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowServicePayment,
  setShowShareCost,
  setShowShareModal,
} from "../../../../../../slice/dashboard";
import { Button } from "../../../../../../components";
import PaymentDetails from "../../../payment-details";
import PercentageModal from './percentage-modal'

const ShareCost = () => {
  const dispatch = useDispatch();

  const serviceNumberRef = useRef(null);
  const serviceAmountRef = useRef(null);
  const recipientIdRef  = useRef(null);
  const percentageRef = useRef(null);
  const descriptionRef = useRef(null);
  const showServicePayment = useSelector(
    (state) => state?.dashboard.states.showServicePayment
  );
  const showShareModal = useSelector(
    (state) => state?.dashboard.states.showShareModal
  );
  const serviceName = useSelector(
    (state) => state?.dashboard.states.serviceName
  );
  const user = useSelector((state) => state.auth.states.user);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    uuid: "",
  });
  const [details, setDetails] = useState({
    serviceNumber: "",
    serviceAmount: "",
    recipientId: "",
    percentage: "",
    description: "",
  });
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    serviceNumberError: "",
    serviceAmountError: "",
    recipientIdError: "",
    percentageError: "",
    descriptionError: "",
  });
  useEffect(() => {
    if (user) {
      setUserDetails({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        uuid: user.uuid || "",
      });
    }
  }, []);
  const validate = () => {
    let isError = false;
    const errors = {
      serviceNumberError: "",
      serviceAmountError: "",
      recipientIdError: "",
      percentageError: "",
      descriptionError: "",
    };

    if (!details.serviceNumber) {
      isError = true;
      errors.serviceNumberError = "Please enter number";
    }
    if (!details.serviceAmount) {
      isError = true;
      errors.serviceAmountError = "Please enter amount";
    }
    if (!details.recipientId) {
      isError = true;
      errors.recipientIdError = "Please enter recipient's id";
    }
    if (!details.percentage) {
      isError = true;
      errors.percentageError =
        "Please enter percentage you want the user with the id above to pay";
    }
    if (!(+details.percentage) >= 100) {
        isError = true;
        errors.percentageError =
          "Percentage must be less than and not equal to 100";
      }
    if (!details.description) {
      isError = true;
      errors.descriptionError = "Please enter a description";
    }

    setError({ ...error, ...errors });
    return isError;
  };
  const handleForm = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setDetails({ ...details, [name]: newValue });
  };
  const handleReset = () => {
    if (serviceNumberRef.current && serviceAmountRef.current) {
      serviceNumberRef.current.value = "";
      serviceAmountRef.current.value = "";
      recipientIdRef.current.value = "";
      percentageRef.current.value = "";
      descriptionRef.current.value = "";
    }
    setDetails({
      serviceAmount: "",
      serviceNumber: "",
      recipientIdRef: "",
      percentageRef: "",
      descriptionRef: "",
    });
  };
  const handleCloseModal = () => {
    dispatch(setShowShareCost(false));
  };

  const handleCloseShare = () => {
    dispatch(setShowShareModal(false));
  };

  const handleShareCost = () => {
    dispatch(setShowShareModal(true));
  };
  const handlePayment = () => {
    const error = validate();
    if (!error) {
      dispatch(setShowServicePayment(true));
    }
  };
  return (
    <div>
      {!showServicePayment && !showShareModal && (
        <div className="bg-primary lg:w-[60%] lg:px-4 px-2 flex flex-col rounded-[5px] lg:py-0 py-4 overflow-auto lg:h-fit h-[40vh]">
          <span
            className="text-xl cursor-pointer text-right lg:pt-4 pr-3 lg:mr-0"
            onClick={handleCloseModal}
          >
            x
          </span>
          <div className="flex py-2 pb-10 px-4 flex-col gap-y-6">
            <span className="lg:text-xl text-secondary font-medium">
              Buy {serviceName}
            </span>
            <div className="lg:pr-20 flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="serviceNumber"
                  className="text-[#181818] text-xs lg:text-sm"
                >
                  Enter {serviceName} Number
                </label>
                <input
                  type="text"
                  name="serviceNumber"
                  id="serviceNumber"
                  ref={serviceNumberRef}
                  maxLength={15}
                  minLength={11}
                  placeholder="e.g: prepaid number"
                  onChange={handleForm}
                  className="px-4 py-2 border text-sm lg:text-base border-[#5F5F5F] rounded-[5px]"
                />
                <span className="text-xs text-[#e62e2e]">
                  {error.serviceNumberError}
                </span>
              </div>
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="serviceAmount"
                  className="text-[#181818] text-xs lg:text-sm"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name="serviceAmount"
                  id="serviceAmount"
                  ref={serviceAmountRef}
                  min={50}
                  max={500000}
                  placeholder="50- 500,000"
                  onChange={handleForm}
                  className="px-4 py-2 border text-sm lg:text-base border-[#5F5F5F] rounded-[5px]"
                />
                <span className="text-xs text-[#e62e2e]">
                  {error.serviceAmountError}
                </span>
              </div>
              <div className="flex gap-x-2">
                <Button className="w-1/2" onClick={handlePayment}>
                  Pay
                </Button>
                <Button className="w-1/2" onClick={handleShareCost}>
                  Share cost
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showShareModal && <PercentageModal />}
      {showServicePayment && (
        <PaymentDetails
          serviceName={serviceName}
          serviceAmount={details.serviceAmount}
          serviceNumber={details.serviceNumber}
          handleReset={handleReset}
        />
      )}
    </div>
  );
};

export default ShareCost;
