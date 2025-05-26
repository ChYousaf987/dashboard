import React, { useState } from "react";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "","",""]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next box
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[90%] max-w-sm p-6 space-y-6 text-center">
        <h2 className="text-xl font-bold">Verification Code</h2>
        <p className="text-gray-600 text-sm">
          Please Enter The Code We Just Have Sent To Email <br />
          <span className="font-medium text-black">Info123@Gmail.com</span>
        </p>

        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:border-black"
            />
          ))}
        </div>

        <div className="text-sm text-gray-500">
          Didn't Receive OTP?{" "}
          <button className="text-black font-semibold underline">
            Resend Code
          </button>
        </div>

        <button className="w-full py-2 rounded-full bg-black text-white font-medium">
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTP;
