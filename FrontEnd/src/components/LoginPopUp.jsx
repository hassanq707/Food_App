import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { set_token, set_name, set_admin_auth } from "../store/slices/TokenSlice";

const LoginPopUp = ({ onClose ,url }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleToggle = () => {
    setIsSignup((prev) => !prev);
    setAgree(false);
    setSignupData({ name: "", email: "", password: "" });
    setLoginData({ email: "", password: "" });
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    if (isSignup) {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = isSignup ? signupData : loginData;
    const endpoint = isSignup ? "/api/user/register" : "/api/user/login";
    try {
      const response = await axios.post(`${url}${endpoint}`, payload);

      if (response.data.role === "admin") {
        localStorage.setItem("role", "admin");
        localStorage.setItem("name", response.data.name);
        dispatch(set_name(response.data.name));
        dispatch(set_admin_auth());
        navigate('/admin');
        onClose();
        return;
      }

      const { success } = response.data;
      if (success) {
        const message = isSignup ? "Successfully Signup" : "Successfully Login";
        dispatch(set_token(response.data.token));
        dispatch(set_name(response.data.name));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        toast.success(message);
        setSignupData({ name: "", email: "", password: "" });
        setLoginData({ email: "", password: "" });
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup ? (
            <>
              <input
                type="text"
                name="name"
                value={signupData.name}
                onChange={handleData}
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                required
                value={signupData.email}
                onChange={handleData}
                placeholder="Email"
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="password"
                name="password"
                required
                value={signupData.password}
                onChange={handleData}
                placeholder="Password"
                className="w-full border px-4 py-2 rounded"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions
                </label>
              </div>
              <button
                type="submit"
                disabled={!agree}
                className={`w-full py-2 rounded text-white font-semibold ${agree
                    ? "bg-orange-700 hover:bg-orange-800"
                    : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <input
                type="email"
                name="email"
                required
                value={loginData.email}
                onChange={handleData}
                placeholder="Email"
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="password"
                required
                name="password"
                value={loginData.password}
                onChange={handleData}
                placeholder="Password"
                className="w-full border px-4 py-2 rounded"
              />
              <button
                type="submit"
                className="w-full py-2 rounded bg-orange-700 text-white font-semibold hover:bg-orange-800"
              >
                Login
              </button>
            </>
          )}
        </form>

        <p className="text-center text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-orange-700 cursor-pointer hover:underline"
            onClick={handleToggle}
          >
            {isSignup ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopUp;
