import React, { useState } from "react";
import { app } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setAccessToken, setSignupDetails } from "../../slice/signup";

import { SignupBg, Spinner } from "../../constants/images";
import { Button } from "../../components";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const inputStyle = `py-2 px-4 rounded-[5px] text-sm lg:text-base bg-[#f5f5f5] text-[#181818]`;
const labelStyle = `text-[#49529b] font-normal text-sm lg:text-base`;

const Signup = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    firstNameError: "",
    lastNameError: "",
    phoneError: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authInstance = getAuth(app);
  const database = getDatabase(app);

  const validate = () => {
    let isError = false;
    const errors = {
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      firstNameError: "",
      lastNameError: "",
      phoneError: "",
    };

    if (!details.email) {
      isError = true;
      errors.emailError = "Please enter your email";
    }
    if (!details.password) {
      isError = true;
      errors.passwordError = "Please enter your password";
    }
    if (details.confirmPassword !== details.password) {
      isError = true;
      errors.confirmPasswordError = "Passwords do not match";
    }
    if (!details.firstName) {
      isError = true;
      errors.firstNameError = "Please enter your first name";
    }
    if (!details.lastName) {
      isError = true;
      errors.lastNameError = "Please enter your last name";
    }
    if (!details.phone) {
      isError = true;
      errors.phoneError = "Please enter your phone number";
    }

    setError({ ...error, ...errors });
    return isError;
  };

  const handleForm = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    const { firstName, lastName, phone, email, password } = details;
    const error = validate();
    if (!error) {
      setLoading(true);
      createUserWithEmailAndPassword(authInstance, email, password)
        .then((userCredential) => {
          // User registration successful, continue with storing additional details
          const user = userCredential.user;
          const userId = user.uid;
          const UUID = phone.substring(1);
          dispatch(setAccessToken(user.accessToken));
          // save user details and access token for protected routes
          dispatch(setSignupDetails({ firstName, lastName, email }));
          // Store the additional details in the database under the user's ID
          const userRef = ref(database, `users/${userId}`);
          set(userRef, {
            first_name: firstName,
            last_name: lastName,
            password: password,
            email: email,
            phone: phone,
            uuid: UUID,
          })
            .then(() => {
              // Send email verification
              sendEmailVerification(user)
                .then(() => {
                  // Show a Toastify success notification
                  toast.success(
                    "Signed up successfully. Check your email to verify your email address."
                  );
                  setTimeout(() => {
                    navigate("verify");
                  }, 2000);
                })
                .catch((error) => {
                  // Handle email verification error
                  toast.error("Error sending email verification");
                  console.log(error);
                })
                .finally(() => {
                  setLoading(false);
                });
            })
            .catch((error) => {
              toast.error("Error in signing up:");
              setLoading(false);
              console.log(error);
            });
        })
        .catch((error) => {
          setLoading(false);
          // Handle registration error, display an error message
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email is already in use");
          }
          if (error.code === "auth/too-many-requests") {
            toast.error("Too many requests, please try again later");
          }
          if (error.code === "auth/network-request-failed") {
            toast.error("Network error occurred");
          }
          if (error.code === "auth/weak-password") {
            toast.warn("Weak password, try again");
          }
          if (error.code === "auth/invalid-email") {
            toast.warn("Invalid email, try again");
          }
          console.log(error);
        });
    }
  };

  return (
    <div className="relative">
      <Link
        to="/"
        className="font-semibold flex flex-col absolute lg:pl-20 pl-6 text-[#49529b] lg:top-[6%] top-[4%] lg:text-3xl"
      >
        <span>OnePay</span>
        <span className="text-sm">Create one account for all</span>
      </Link>{" "}
      <div className="text-lightgray text-xs lg:text-sm my-4 font-medium w-full lg:top-[7%] top-[4%] absolute lg:pl-20 pl-6 pt-10">
        To test full functionalities, we recommend testing with a friend. <br />{" "}
        So, signup and signup with a second device as well or <br /> encourage a
        friend to sign up to test. <br /> Thanks!
      </div>
      <div className="lg:w-full w-full gap-x-4 flex lg:justify-between items-start">
        <div className="lg:w-[40%] w-full flex px-6 pb-6 py-[11rem] lg:pt-[15rem] lg:pl-20 flex-col gap-y-4">
          <div className="flex-col flex gap-y-1">
            <label htmlFor="firstName" className={labelStyle}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className={inputStyle}
              onChange={handleForm}
            />
            <span className="text-xs text-[#e62e2e]">
              {error.firstNameError}
            </span>
          </div>
          <div className="flex-col flex gap-y-1">
            <label htmlFor="lastName" className={labelStyle}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className={inputStyle}
              onChange={handleForm}
            />
            <span className="text-xs text-[#e62e2e]">
              {error.lastNameError}
            </span>
          </div>
          <div className="flex-col flex gap-y-1">
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={inputStyle}
              onChange={handleForm}
            />
            <span className="text-xs text-[#e62e2e]">{error.emailError}</span>
          </div>
          <div className="flex-col flex gap-y-1">
            <label htmlFor="phone" className={labelStyle}>
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className={inputStyle}
              onChange={handleForm}
            />
            <span className="text-xs text-[#e62e2e]">{error.phoneError}</span>
          </div>
          <div className="flex-col flex gap-y-1">
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={inputStyle}
              onChange={handleForm}
            />
            <span className="text-xs text-[#e62e2e]">
              {error.passwordError}
            </span>
          </div>
          <div className="flex-col flex gap-y-1">
            <label htmlFor="confirmPassword" className={labelStyle}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={inputStyle}
              onChange={handleForm}
            />
            <span className="text-xs text-[#e62e2e]">
              {error.confirmPasswordError}
            </span>
          </div>
          <div className="flex-col flex pt-6">
            <Button
              onClick={handleSubmit}
              className="flex justify-center"
              disabled={loading}
            >
              {loading ? (
                <img src={Spinner} alt="loading" className="w-[25px]" />
              ) : (
                <span>Sign up</span>
              )}
            </Button>
            <div className="flex lg:text-base text-sm w-full gap-x-2 pt-6 justfy-between">
              <span className="text-[#181818]">Already have an account? </span>
              <Link to={"/prototype/signin"} className="text-[#49529b]">
                Sign in
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[50vw] h-screen lg:block hidden">
          <img src={SignupBg} alt="" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
