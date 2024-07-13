import React, { useState } from "react";
import { app, database } from "../../firebase/config";
import { getDatabase, ref, get, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { Spinner } from "../../constants/images";
import { toast } from "react-toastify";
import { setAccessToken, setUser } from "../../slice/signup";

const inputStyle = `py-2 px-4 rounded-[5px] bg-[#f5f5f5] text-sm lg:text-base text-[#181818]`;
const labelStyle = `text-[#49529b] font-normal text-sm lg:text-base`;

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authInstance = getAuth(app);

  const validate = () => {
    let isError = false;
    const errors = {
      emailError: "",
      passwordError: "",
    };

    if (!details.email) {
      isError = true;
      errors.emailError = "Please enter your email";
    }
    if (!details.password) {
      isError = true;
      errors.passwordError = "Please enter your password";
    }

    setError({ ...error, ...errors });
    return isError;
  };

  const handleForm = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const getUserDetails = async (userId) => {
    const userRef = ref(database, "users/" + userId);
    const userSnapshot = await get(child(userRef, "/"));
    if (userSnapshot.exists()) {
      return userSnapshot.val();
    } else {
      return null;
    }
  };
  const handleLogin = () => {
    const { email, password } = details;
    const error = validate();
    if (!error) {
      setLoading(true);
      signInWithEmailAndPassword(authInstance, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userDetails = await getUserDetails(user.uid);
          dispatch(
            setUser({
              firstName: userDetails.first_name,
              lastName: userDetails.last_name,
              email: userDetails.email,
              uuid: userDetails.uuid,
              phone: userDetails.phone,
            })
          );
          dispatch(setAccessToken(user.accessToken));
          if (user.emailVerified) {
            // User is logged in and email is verified
            // Proceed with the desired action (e.g., redirect to a dashboard)
            toast.success("Logged in successfully");
            navigate("/prototype/dashboard");
          } else {
            // Email is not verified
            // Display an error message
            toast.warn("Email not verified, check email for verification link");
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // Handle login error, display an error message
          if (error.code === "auth/invalid-credential") {
            toast.error("Invalid credentials: Wrong email or password");
          }
          if (error.code === "auth/too-many-requests") {
            toast.error("Too many requests, please try again later");
          }
          if (error.code === "auth/network-request-failed") {
            toast.error("Network error occurred");
          }
          console.log(error);
        });
    }
  };
  return (
    <div className="relative">
      <Link
        to="/"
        className="font-semibold flex flex-col absolute pl-6 lg:pl-20 text-[#49529b] lg:top-[6%] top-[4%] lg:text-3xl"
      >
        <span>OnePay</span>
        <span className="text-sm">Welcome back</span>
      </Link>
      <div className="lg:w-[40%] pt-24 lg:pt-[25rem] px-6 lg:pl-20 flex justify-center items-start">
        <div className="w-full flex flex-col gap-y-4">
          <div className="flex-col flex gap-y-1">
            <label htmlFor="firstName" className={labelStyle}>
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={inputStyle}
              onChange={handleForm}
            />
            <span className="text-xs text-[#e62e2e]">{error.emailError}</span>
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
          <div className="flex-col flex pt-6">
            <Button
              onClick={handleLogin}
              className="flex justify-center"
              disabled={loading}
            >
              {loading ? (
                <img src={Spinner} alt="loading" className="w-[25px]" />
              ) : (
                <span>Sign in</span>
              )}
            </Button>
            <div className="flex w-full lg:text-base text-sm  gap-x-2 pt-6 justfy-between">
              <span className="text-[#181818]">Don't have an account? </span>
              <Link to={"/prototype/signup"} className="text-[#49529b]">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
