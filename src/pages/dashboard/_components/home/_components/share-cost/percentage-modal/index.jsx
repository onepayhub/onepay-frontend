import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowShareModal } from "../../../../../../../slice/dashboard";
import { Button } from "../../../../../../../components";
import { Spinner } from "../../../../../../../constants/images";
import { database } from "../../../../../../../firebase/config";
import { generateRandomUID } from "../../../../../../../hooks/useGenerateId";
import { get, push, ref, set } from "firebase/database";
import { toast } from "react-toastify";

const ShareCost = () => {
  const dispatch = useDispatch();
  const serviceName = useSelector(
    (state) => state?.dashboard.states.serviceName
  );
  const recipientIdRef = useRef(null);
  const percentageRef = useRef(null);
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);

  const user = useSelector((state) => state.auth.states.user);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    uuid: "",
  });
  const [details, setDetails] = useState({
    recipientId: "",
    percentage: "",
    amount: "",
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
    recipientIdError: "",
    percentageError: "",
    amountError: "",
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
      recipientIdError: "",
      percentageError: "",
      amountError: "",
      descriptionError: "",
    };
    if (!details.recipientId) {
      isError = true;
      errors.recipientIdError = "Please enter recipient's id";
    }
    if (details.recipientId === userDetails.uuid) {
      isError = true;
      errors.recipientIdError =
        "Please enter a valid recipient's id, not your id";
    }
    if (!details.percentage) {
      isError = true;
      errors.percentageError =
        "Please enter percentage you want the user with the id above to pay";
    }
    if (!details.amount) {
      isError = true;
      errors.amountError = `Please enter an amount for ${serviceName}`;
    }
    if (+details.percentage >= 100) {
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
    if (
      recipientIdRef.current &&
      percentageRef.current &&
      descriptionRef.current
    ) {
      recipientIdRef.current.value = "";
      percentageRef.current.value = "";
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    }
    setDetails({
      recipientIdRef: "",
      percentageRef: "",
      amountRef: "",
      descriptionRef: "",
    });
  };
  const handleCloseShare = () => {
    dispatch(setShowShareModal(false));
    handleReset();
  };

  const handlePayment = async () => {
    const error = validate();
    if (!error) {
      setLoading(true);
      const usersRef = ref(database, "users");

      try {
        const usersSnapshot = await get(usersRef);
        let userId = null;

        usersSnapshot.forEach((userSnapshot) => {
          const userData = userSnapshot.val();
          if (userData.uuid === details.recipientId) {
            userId = userSnapshot.key;
            return; // Exit the forEach loop once the user is found
          }
        });

        if (userId) {
          const notificationsRef = ref(database, "notifications");
          const newNotificationRef = push(notificationsRef);

          const notificationData = {
            id: generateRandomUID(5),
            title: "request to share cost",
            recipientId: details.recipientId,
            bank: "Onepay",
            amount: details.amount,
            percentage: details.percentage,
            amountToPay: (+details.percentage / 100) * +details.amount,
            reason: details.description,
            userId: userId,
            isRead: false,
            date: formattedDate,
            userDetails,
          };

          set(newNotificationRef, notificationData)
            .then(() => {
              setLoading(false);
              toast.success("Request sent successfully!");
              handleReset();
            })
            .catch((error) => {
              setLoading(false);
              toast.error("Error sending request");
              console.log(error);
            });
        } else {
          setLoading(false);
          toast.error(
            "User not found for the recipient Id",
            details.recipientId
          );
        }
      } catch (error) {
        toast.error("Error searching for user with recipientId:");
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="bg-primary lg:w-[60%] lg:px-4 px-2 flex flex-col rounded-[5px] lg:py-0 py-4 overflow-auto lg:h-fit h-[60vh]">
        <span
          className="text-xl cursor-pointer text-right lg:pt-4 pr-3 lg:mr-0"
          onClick={handleCloseShare}
        >
          x
        </span>
        <div className="flex py-2 pb-10 px-4 flex-col gap-y-6">
          <span className="lg:text-xl text-secondary font-medium">
            Share Cost
          </span>
          <div className="lg:pr-20 flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="recipientId"
                className="text-[#181818] text-xs lg:text-sm"
              >
                Recipient's ID
              </label>
              <input
                type="text"
                name="recipientId"
                id="recipientId"
                ref={recipientIdRef}
                maxLength={15}
                minLength={11}
                placeholder="7033936609"
                onChange={handleForm}
                className="px-4 py-2 border text-sm lg:text-base border-[#5F5F5F] rounded-[5px]"
              />
              <span className="text-xs text-[#e62e2e]">
                {error.recipientIdError}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="amount"
                className="text-[#181818] text-xs lg:text-sm"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                ref={amountRef}
                max={100}
                min={10}
                placeholder={`Enter ${serviceName} amount`}
                onChange={handleForm}
                className="px-4 py-2 border text-sm lg:text-base border-[#5F5F5F] rounded-[5px]"
              />
              <span className="text-xs text-[#e62e2e]">
                {error.amountError}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="percentage"
                className="text-[#181818] text-xs lg:text-sm"
              >
                Percentage{" "}
                <span className="text-lightgray text-xs lg:text-sm">
                  (must be below 100 percent)
                </span>
              </label>
              <input
                type="number"
                name="percentage"
                id="percentage"
                ref={percentageRef}
                max={100}
                min={10}
                placeholder="Enter percentage you want this user to pay"
                onChange={handleForm}
                className="px-4 py-2 border text-sm lg:text-base border-[#5F5F5F] rounded-[5px]"
              />
              <span className="text-xs text-[#e62e2e]">
                {error.percentageError}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="description"
                className="text-[#181818] text-xs lg:text-sm"
              >
                Description
              </label>
              <textarea
                type="number"
                name="description"
                id="description"
                ref={descriptionRef}
                min={50}
                max={500000}
                placeholder=""
                onChange={handleForm}
                className="px-4 py-2 border text-sm lg:text-base border-[#5F5F5F] rounded-[5px]"
              />
              <span className="text-xs text-[#e62e2e]">
                {error.descriptionError}
              </span>
            </div>
            <div>
              <Button
                className="w-full flex justify-center"
                onClick={handlePayment}
              >
                {loading ? (
                  <img src={Spinner} alt="loading" className="w-[25px]" />
                ) : (
                  <span>Share</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCost;
