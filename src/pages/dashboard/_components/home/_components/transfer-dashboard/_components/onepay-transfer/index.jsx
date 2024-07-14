import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
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
          <span className="lg:text-lg text-base font-medium">Recipient Account</span>
          <div className="w-1/2">
            <input
              type="text"
              className="px-3 py-4 bg-[#dfdfdf] lg:w-full rounded-[5px]"
              placeholder="Phone No or Account Name"
              value={recipientId}
              onChange={handleInputChange}
            />
            {loading && <div className="mt-2 mx-auto text-center">Loading...</div>}
          </div>
          {recipientData.length > 0 ? (
            <div>
              {recipientData.map((recipient) => (
                <div key={recipient.id}>
                  <p>{recipient.first_name}{' '}{recipient.last_name}</p>
                  <p>{recipient.uuid}</p>
                  {/* Add more recipient information as needed */}
                </div>
              ))}
            </div>
          ) : (
            recipientId && <div>No matching recipient found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnepayTransfer;
