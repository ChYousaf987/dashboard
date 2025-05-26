import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loginMyUser, userReset } from "../features/users/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, userLoading, userError, userSuccess, userMessage } =
    useSelector((state) => {
      console.log("SignIn Redux state:", state.auth);
      return state.auth;
    });

  useEffect(() => {
    console.log("SignIn mounting, resetting state");
    dispatch(userReset());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter all fields");
      return;
    }
    dispatch(loginMyUser({ email, password }));
  };

  useEffect(() => {
    if (userError) {
      toast.error(userMessage, { toastId: "login-error" });
      dispatch(userReset());
    }
    if (userSuccess && user) {
      toast.success("Login successful!", { toastId: "login-success" });
      dispatch(userReset());
      navigate("/Dashboard", { replace: true });
    }
  }, [userError, userSuccess, user, userMessage, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-6 w-[30%] bg-slate-200 rounded border border-gray-300 p-6 shadow-xl mx-auto scale-125">
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        <p className="text-center text-gray-600">
          Please enter your details to continue
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-black text-white py-2"
            disabled={userLoading}
          >
            {userLoading ? "Loading..." : "LogIn"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
