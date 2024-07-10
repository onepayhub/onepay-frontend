import { Route, Routes } from "react-router-dom";
import { HomePage, Login, Signup, Verified, Verify } from "./pages/";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="prototype">
          <Route path="signup" element={<Signup />} />
          <Route path="signup/verify" element={<Verify />} />
          <Route path="signup/verified" element={<Verified />} />
          <Route path="signin" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
