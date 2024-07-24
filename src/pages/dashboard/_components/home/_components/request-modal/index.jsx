import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { setShowRequestModal } from "../../../../../../slice/dashboard";
import { Button } from "../../../../../../components";
import { ref, push, set, get } from "firebase/database";
import { database } from "../../../../../../firebase/config";
import { toast } from "react-toastify";
import { Spinner } from "../../../../../../constants/images";

const RequestModal = () => {
  const titleRef = useRef(null);
  const recipientIdRef = useRef(null);
  const amountRef = useRef(null);
  const reasonRef = useRef(null);
  const user = useSelector((state) => state.auth.states.user);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    uuid: "",
  });
  const [details, setDetails] = useState({
    title: "",
    recipientId: "",
    amount: "",
    reason: "",
    agreeTerms: false,
  });
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    titleError: "",
    recipientIdError: "",
    amountError: "",
    reasonError: "",
    agreeTermsError: "",
  });
  const dispatch = useDispatch();

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
      titleError: "",
      recipientIdError: "",
      amountError: "",
      reasonError: "",
      agreeTermsError: "",
    };
    if (!details.title) {
      isError = true;
      errors.titleError = "Please enter a title";
    }
    if (!details.recipientId) {
      isError = true;
      errors.recipientIdError = "Please enter recipient's id";
    }
    if (details.recipientId === userDetails.uuid) {
      isError = true;
      errors.recipientIdError = "Please select a designated account, not yours";
    }
    if (!details.amount) {
      isError = true;
      errors.amountError = "Please enter required amount";
    }
    if (!details.reason) {
      isError = true;
      errors.reasonError = "Please enter reason for request";
    }
    if (!details.agreeTerms) {
      isError = true;
      errors.agreeTermsError = "Please read and check the box to submit";
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
    titleRef.current.value = "";
    recipientIdRef.current.value = "";
    amountRef.current.value = "";
    reasonRef.current.value = "";
    setDetails({
      title: "",
      recipientId: "",
      amount: "",
      reason: "",
    });
  };
  const handleCloseModal = () => {
    dispatch(setShowRequestModal(false));
  };

  const handleSumbit = async () => {
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
            title: details.title,
            recipientId: details.recipientId,
            amount: details.amount,
            reason: details.reason,
            userId: userId,
            isRead: false,
            date: formattedDate,
            userDetails,
          };

          set(newNotificationRef, notificationData)
            .then(() => {
              setLoading(false);
              toast.success("Notification sent successfully!");
              handleReset();
            })
            .catch((error) => {
              setLoading(false);
              toast.error("Error sending notification");
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
            <label
              htmlFor="title"
              className="text-[#181818] text-xs lg:text-sm"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              ref={titleRef}
              placeholder="Payment request"
              onChange={handleForm}
              className="px-4 py-2 border uppercase text-sm lg:text-base border-[#5F5F5F] rounded-[5px]"
            />
            <span className="text-xs text-[#e62e2e]">{error.titleError}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="recipientId"
              className="text-[#181818] text-xs lg:text-sm"
            >
              Recepient's Id
            </label>
            <input
              type="text"
              name="recipientId"
              id="recipientId"
              ref={recipientIdRef}
              placeholder="7033936609"
              onChange={handleForm}
              className="px-4 py-2 border uppercase text-sm lg:text-base border-[#5F5F5F] rounded-[5px]"
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
              placeholder="Amount"
              onChange={handleForm}
              className="px-4 py-2 text-sm lg:text-base border border-[#5F5F5F] rounded-[5px]"
            />
            <span className="text-xs text-[#e62e2e]">{error.amountError}</span>
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="reason"
              className="text-[#181818] text-xs lg:text-sm"
            >
              Description / Reason
            </label>
            <textarea
              type="text"
              name="reason"
              id="reason"
              ref={reasonRef}
              placeholder="Brief description on reason for request"
              onChange={handleForm}
              className="px-4 py-2 text-sm lg:text-base border border-[#5F5F5F] rounded-[5px]"
            />
            <span className="text-xs text-[#e62e2e]">{error.reasonError}</span>
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
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                checked={details.agreeTerms}
                onChange={handleForm}
              />
              <span className="text-lightgray text-xs">
                I confirm that the information provided is accurate and I agree
                to the{" "}
                <span className="text-lightblue underline underline-offset-[3px] cursor-pointer">
                  Terms and Conditions
                </span>{" "}
                of the payment request or debt owed.
              </span>
            </div>
            <span className="text-xs text-[#e62e2e]">
              {error.agreeTermsError}
            </span>
          </div>
          <div className="flex items-center gap-x-4 pt-4">
            <Button
              className="w-full"
              backgroundColor="transparent"
              textColor="#3745c0"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="w-full flex justify-center"
              onClick={handleSumbit}
            >
              {loading ? (
                <img src={Spinner} alt="loading" className="w-[25px]" />
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
