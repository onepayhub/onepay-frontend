import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, HomePage, Login, Signup, Verified, Verify } from "./pages/";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = () => {
      navigate(-1); // Navigates back to the previous page using React Router
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="prototype">
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="signup/verify" element={<Verify />} />
            <Route path="signup/verified" element={<Verified />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
