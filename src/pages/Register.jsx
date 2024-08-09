import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { toast, Toaster } from "react-hot-toast";
import { Button, Spinner } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,8}$/;

    if (username.length < 4) {
      return toast.error("Username must be at least 4 letters long", { duration: 5000 });
    }

    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must contain one uppercase, one lowercase, one number, one special character, and be 6 to 8 characters long",
        { duration: 5000 }
      );
    }

    if (!email.length) {
      return toast.error("Email must be at least 3 letters long");
    }

    try {
      setLoading(true); // Set loading to true when the request starts
      await toast.promise(
        axios.post(`${URL}/api/auth/register`, {
          username,
          email,
          password,
        }),
        {
          loading: "Registering...",
          success: "Registration successful! Redirecting to login...",
          error: "Registration failed. Please try again."
        }
      );
      // Add a delay before navigating
      await new Promise(resolve => setTimeout(resolve, 5000)); // 3-second delay
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when the request ends
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-2xl opacity-60 p-4">
          <Link to="/">BLOG<span className="text-[#C80036]">iq</span></Link>
        </h1>
        <h3>
          <Link id="link" to="/login">Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <Toaster />
        <div className="flex flex-col justify-center items-center space-y-4 w-[85%] md:w-[25%]">
          <h1 className="text-xl p-4 w-[100%] text-center">Create an account</h1>
          <div className="relative w-full">
            <FaUser className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 py-2 border-2 border-[#8080805e] outline-0 rounded"
              type="text"
              placeholder="username"
            />
          </div>
          <div className="relative w-full">
            <FaEnvelope className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 py-2 border-2 border-[#8080805e] outline-0 rounded"
              type="email"
              placeholder="email"
              
            />
          </div>
          <div className="relative w-full">
            <FaLock className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 py-2 border-2 border-[#8080805e] outline-0 rounded"
              type={showPassword ? "text" : "password"}
              placeholder="password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12.009V16m4-4.009V12m-8-4.009V8m-4 4.009V12m0 0V16m4 0v-4m4 4v-4m0 4v-4m0 0h4m0 0h-4m0 0v4m0 0h4M2.5 12C2.5 12 6.5 6 12 6c4.558 0 8.5 6 8.5 6s-4 6-8.5 6C6.5 18 2.5 12 2.5 12z"></path></svg>
              ) : (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v6m0 0v6m0-6H6m6 6h6m-6-6h6m6 6c-2.29 0-4.42-.8-6-2.1m6 0c-2.6 1.2-5.4 1.2-8 0m6-12c4.42 0 8 6 8 6s-3.58 6-8 6m0 0c-4.42 0-8-6-8-6s3.58-6 8-6z"></path></svg>
              )}
            </button>
          </div>
          <Button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg text-white bg-[#C80036] rounded-lg hover:bg-gray-500 hover:text-black"
            disabled={loading} // Disable the button when loading
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
              "Register"
            )}
          </Button>
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-[#C80036]">
              <Link to="/login">Login</Link>
            </p>
            <p>
             

            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
