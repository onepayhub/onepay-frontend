import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Spinner2 } from "../../../../../../../../constants/images";
import { setShowOnepay } from "../../../../../../../../slice/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../../../../../../../firebase/config";
import { child, get, ref } from "firebase/database";

const OnepayTransfer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.states.user);
  const [recipientId, setRecipientId] = useState("");
  const [recipientData, setRecipientData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = () => {
    dispatch(setShowOnepay(false));
  };

  const handleInputChange = (e) => {
    setRecipientId(e.target.value);
  };

  const handleGetUser = async () => {
    if (recipientId) {
      setLoading(true);
      const recipientsRef = ref(database, "users");
      const userSnapshot = await get(child(recipientsRef, "/"));
      const recipients = userSnapshot.val();
      // console.log(recipients)
      if (recipients) {
        const recipientList = Object.values(recipients).filter(
          (recipient) => recipient.uuid === recipientId
        );
        setRecipientData(recipientList);
        setLoading(false);
      } else {
        setRecipientData([]);
      }
      setLoading(false);
    } else {
      setRecipientData([]);
    }
  };
  useEffect(() => {
    handleGetUser();
  }, [recipientId]);

  useEffect(() => {
    handleGetUser();
    const matchingRecipient = recipientData.find(
      (recipient) => recipient.uuid === user.uuid
    );
    if (matchingRecipient) {
      setLoading(false);
      setError(matchingRecipient.uuid);
    } else {
      setError(null); // Reset error state
    }
  }, [recipientId, recipientData, user.uuid]);

  return (
    <div className="mb-10">
      <div className="relative flex flex-col gap-y-6">
        <div className="absolute gap-x-2 flex items-center">
          <MdOutlineKeyboardArrowLeft
            size={25}
            className="cursor-pointer"
            onClick={handleReset}
          />
          <span className="text-sm lg:text-base">
            Transfer to OnePay Account
          </span>
        </div>

        <div className="flex flex-col gap-y-4 mt-16 px-3">
          <span className="lg:text-lg text-base font-medium">
            Recipient Account
          </span>
          <div className="w-1/2">
            <input
              type="text"
              className="px-3 py-4 bg-[#dfdfdf] lg:w-full rounded-[5px]"
              placeholder="Phone No or Account Name"
              value={recipientId}
              onChange={handleInputChange}
            />
            {loading && (
              <div className="mt-4">
                <img src={Spinner2} className="w-[5%] mx-auto" alt="loading" />
              </div>
            )}
            {error && (
              <div className="lg:text-sm text-xs pt-3 text-[#d83a3a]">
                {user.uuid} is your OnePay Account number. You can only transfer
                money to other OnePay Accounts.
              </div>
            )}
          </div>
          {(!error && recipientData.length) > 0 ? (
            <div>
              {recipientData.map((recipient) => (
                <div key={recipient.id}>
                  <p>
                    {recipient.first_name} {recipient.last_name}
                  </p>
                  <p>{recipient.uuid}</p>
                  {/* Add more recipient information as needed */}
                </div>
              ))}
            </div>
          ) : (
            !error &&
            recipientId && (
              <div className="lg:text-sm text-xs pt-3 text-[#d83a3a]">
                Invalid account number. Please check and try again.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OnepayTransfer;
