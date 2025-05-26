import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-6 w-[30%] mx-auto scale-125">
        <h2 className="text-2xl font-bold text-center">Sign up</h2>
        <p className="text-center text-gray-600">
          Please Enter your details to continue
        </p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 rounded-full border-gray-400 checked:bg-blue-500 checked:border-transparent focus:ring-0"
            />
            <span className="text-blue-500">
              I accept the terms and privacy policy
            </span>
          </div>
          <button className="w-full rounded-full bg-black text-white py-2 ">
            Register
          </button>
          <div className="text-center text-gray-600">Or Sign Up With</div>
          <div className="flex justify-center space-x-4">
            <button className="border rounded-full p-2 justify-center flex items-center">
              <FaFacebookF size={20} />
            </button>
            <button className="border rounded-full p-2 justify-center flex items-center">
              <FcGoogle size={20} />
            </button>
            <button className="border rounded-full p-2 justify-center flex items-center">
              <FaApple size={20} />
            </button>
          </div>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/SignIn" className="text-blue-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
