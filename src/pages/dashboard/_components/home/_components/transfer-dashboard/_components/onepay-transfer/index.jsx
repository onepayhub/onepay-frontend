import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { Spinner2 } from "../../../../../../../../constants/images";
import {
  setAccountDetails,
  setShowOnepay,
} from "../../../../../../../../slice/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../../../../../../../firebase/config";
import { child, get, ref } from "firebase/database";
import InputAccount from "../input-account";
import AccountLists from "../account-lists";

const OnepayTransfer = () => {
  const dispatch = useDispatch();
  const [showAmoountInput, setShowAmountInput] = useState(false);
  const user = useSelector((state) => state.auth.states.user);
  const [details, setDetails] = useState({});
  const [recipientId, setRecipientId] = useState("");
  const [recipientData, setRecipientData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAccounts, setShowAccounts] = useState(false);

  const handleReset = () => {
    dispatch(setShowOnepay(false));
  };

  const handleShowAccounts = (value) => {
    setShowAccounts(value);
    setShowAmountInput(null);
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
      if (recipients) {
        const recipientList = Object.values(recipients).filter((recipient) => {
          const fullName =
            `${recipient.first_name} ${recipient.last_name}`.toLowerCase();
          return (
            recipient.uuid.includes(recipientId) ||
            fullName.includes(recipientId.toLowerCase())
          );
        });
        setRecipientData(recipientList);
      } else {
        setRecipientData([]);
      }
      setLoading(false);
    } else {
      setRecipientData([]);
      setLoading(false);
    }
  };
  const handleAccountClick = (fname, lname, account) => {
    dispatch(
      setAccountDetails({
        first_name: fname,
        last_name: lname,
        account: account,
      })
    );
    setDetails({
      first_name: fname,
      last_name: lname,
      account: account,
    });
    setShowAmountInput(true);
  };
  
  // useEffect(() => {
  //   handleGetUser();
  // }, [recipientId]);

  useEffect(() => {
    handleGetUser();
    const matchingRecipient = recipientData.find(
      (recipient) => recipient.uuid === user.uuid
    );
    if (matchingRecipient) {
      setError(matchingRecipient.uuid);
      setLoading(false);
    } else {
      setError(null); // Reset error state
    }
  }, [recipientId]);

  return (
    <div className="mb-10 relative">
      {" "}
      <div className="absolute gap-x-2 flex items-center">
        <MdOutlineKeyboardArrowLeft
          size={25}
          className="cursor-pointer"
          onClick={handleReset}
        />
        <span className="text-sm lg:text-base">Transfer to OnePay Account</span>
      </div>
      {!showAmoountInput && !showAccounts && (
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-4 mt-16 px-3">
            <span className="lg:text-lg text-base font-medium">
              Recipient Account
            </span>
            <div className="w-full lg:w-1/2">
              <input
                type="text"
                className="px-3 py-4 bg-[#dfdfdf] lg:w-full rounded-[5px]"
                placeholder="Phone No or Account Name"
                value={recipientId}
                onChange={handleInputChange}
              />
              {loading && (
                <div className="mt-4">
                  <img
                    src={Spinner2}
                    className="w-[5%] mx-auto"
                    alt="loading"
                  />
                </div>
              )}
              {error && (
                <div className="lg:text-sm text-xs pt-3 text-[#d83a3a]">
                  {user.uuid} is your OnePay Account number. You can only
                  transfer money to other OnePay Accounts.
                </div>
              )}
            </div>
            {!error && recipientData.length > 0 ? (
              <div className="flex flex-col gap-y-6 pt-4">
                {recipientData.map((recipient) => (
                  <div
                    key={recipient.id}
                    className="flex items-center gap-x-4 hover:cursor-pointer"
                    onClick={() =>
                      handleAccountClick(
                        recipient.first_name,
                        recipient.last_name,
                        recipient.uuid
                      )
                    }
                  >
                    {" "}
                    <div className="bg-[#bebebe] rounded-[50%] p-2">
                      <GoPerson size={30} color="#fff" />
                    </div>
                    <div className="flex flex-col space-y-2 ">
                      <p className="uppercase lg:text-lg text-sm font-normal tracking-wider">
                        {recipient.first_name} {recipient.last_name}
                      </p>
                      <p className="text-lightgray lg:text-base text-xs tracking-widest">
                        {recipient.uuid}
                      </p>
                    </div>
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
      )}
      {showAmoountInput && !showAccounts && (
        <InputAccount handleBankLists={handleShowAccounts} details={details} />
      )}
      {showAccounts && <AccountLists />}
    </div>
  );
};

export default OnepayTransfer;
