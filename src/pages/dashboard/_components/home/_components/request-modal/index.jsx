import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { setShowRequestModal } from "../../../../../../slice/dashboard";
import { Button } from "../../../../../../components";
import { ref, push, set, get } from "firebase/database";
import { database } from "../../../../../../firebase/config";

const RequestModal = () => {
  const user = useSelector((state) => state.auth.states.user);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    uuid: ""
  })
  const [details, setDetails] = useState({
    title: "Payment Request",
    recipientId: "",
    amount: "",
    reason: "",
  });
  const [error, setError] = useState({
    recipientIdError: "",
    amountError: "",
    reasonError: "",
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
      recipientIdError: "",
      amountError: "",
      reasonError: "",
    };

    if (!details.recipientId) {
      isError = true;
      errors.recipientIdError = "Please enter recipient's id";
    }
    if (!details.amount) {
      isError = true;
      errors.amountError = "Please enter required amount";
    }
    if (!details.reason) {
      isError = true;
      errors.reasonError = "Please enter reason for request";
    }

    setError({ ...error, ...errors });
    return isError;
  };

  const handleForm = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setDetails({
      id: "",
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
            title: "Payment Request",
            recipientId: details.recipientId,
            amount: details.amount,
            reason: details.reason,
            userId: userId,
            isRead: false,
            userDetails
          };

          set(newNotificationRef, notificationData)
            .then(() => {
              console.log("Notification sent successfully!");
            })
            .catch((error) => {
              console.error("Error sending notification:", error);
            });
        } else {
          console.log(
            "User not found for the recipientId:",
            details.recipientId
          );
          // Handle this case, show an error message, etc.
        }
      } catch (error) {
        console.error("Error searching for user with recipientId:", error);
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
              htmlFor="recipientId"
              className="text-[#181818] text-xs lg:text-sm"
            >
              Recepient's Id
            </label>
            <input
              type="text"
              name="recipientId"
              id="recipientId"
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
              type="text"
              name="amount"
              id="amount"
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
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button className="w-full" onClick={handleSumbit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
