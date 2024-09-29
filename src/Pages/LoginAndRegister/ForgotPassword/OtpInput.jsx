/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import ResetPassword from "./ResetPassword";

const OtpInput = ({email, length = 4, onOtpSubmit = () => {}, newPassword }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow only one input per box
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to the next input if the current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = () => {
    const combinedOtp = otp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp); // Trigger OTP submission when the button is clicked
    } else {
      alert("Please fill out all the OTP fields.");
    }
  };

  return (
    <div>
        {
        !newPassword? <div>
        <div className="flex items-center justify-center">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 md:w-20 h-10 m-2 text-center text-sm border"
            />
          ))}
        </div>
  
        {/* Button to trigger OTP verification */}
        <div className="flex justify-between items-center mt-4">
          <p>Did not get the OTP?</p>
          <button className="font-bold">Resend OTP</button>
        </div>
  
        {/* Verify OTP Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleOtpSubmit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Verify OTP
          </button>
        </div>
      </div>: <ResetPassword email={email} />
    }
    </div>
  );
};

export default OtpInput;
