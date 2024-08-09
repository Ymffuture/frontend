import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Button, Spinner } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa"; 
import { URL } from "../url";
import Loader from "../components/Loader"; // Ensure Loader component is correctly imported

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email) {
      return toast.error("Please enter your email");
    }

    setLoading(true);

    try {
      await toast.promise(
        axios.post(`${URL}/api/auth/reset-password`, { email }),
        {
          loading: "Sending reset email...",
          success: "Check your email for reset instructions.",
          error: "Failed to send reset email. Please try again.",
        }
      );
      navigate("/login");
    } catch (err) {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission
      handleResetPassword(); // Trigger reset password function
    }
  };

  return (
    <>
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loading && (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader /> {/* Display loader while loading */}
          </div>
        )}
        {!loading && (
          <>
            <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
              <h1 className="text-lg md:text-2xl opacity-60 p-4">
                <Link to="/">BLOG<span className="text-[#C80036]">iq</span></Link>
              </h1>
            </div>
            <div className="w-full flex justify-center items-center h-[80vh]">
              <Toaster />
              <div className="flex flex-col justify-center items-center space-y-4 w-[85%] md:w-[25%]">
                <h1 className="text-xl p-4 w-[100%] text-center">Reset Password</h1>
                <div className="relative w-full">
                  <FaEnvelope className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown} // Add onKeyDown event
                    className="w-full pl-12 py-2 border-2 border-[#8080805e] outline-0 rounded"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <Button
                  onClick={handleResetPassword}
                  className="w-full px-4 py-4 text-lg text-white bg-[#C80036] rounded-lg hover:bg-gray-500 hover:text-black"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      {"  Loading..."}
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
                <div className="flex justify-center items-center space-x-3">
                  <p>Remembered your password?</p>
                  <p className="text-gray-500 hover:text-[#C80036]">
                    <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
