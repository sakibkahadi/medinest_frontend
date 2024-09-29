import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

import { MdEmail } from "react-icons/md";
import OtpInput from "./OtpInput";
import { useState } from "react";

const ForgotPassword = () => {
  
  const axiosPublic = useAxiosPublic()
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showOTP, setShowOTP]= useState(false)
  const [newPassword, setNewPassword] = useState(false)
  const goBack = () => {
    window.history.back();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    const details = {
      email: email,
    };
    console.log(details.email);

    try{
      axiosPublic.post('/users/forget-password', {email})
    .then(res=>{console.log(res.data)
      if(res.data.success){
        
        setShowOTP(true)
      }
      
    }
  
  )
    .catch(err=>console.log(err.response.data.message))
    }catch(err){
      console.log(err=>console.log(err))

    }
 
  };
  const onOtpSubmit = (otp)=>{
    axiosPublic.post('/users/verifying-otp', {otp, email})
    .then(res=>{if(res.data.success){
      setNewPassword(true)
    }})
    .catch(err=>console.log(err.response.data.message))
  }
  return (
    <div className="md:w-1/2 mx-auto mt-10">
     { !showOTP &&  <div className=" text-lg text-blue-500 mb-10 font-bold">
        Please enter you email to reset your password
      </div> }
      {
        showOTP && !newPassword && <div  className="text-lg text-blue-500 mb-10 font-bold">Please enter the OTP we have sent you in your email</div>
      }
      {
        showOTP && newPassword && <div  className="text-lg text-blue-500 mb-10 font-bold">your password must be  6 character long</div>
      }
      {
        !showOTP ? <form onSubmit={onSubmit}>
        <div className="flex items-center relative mb-6">
          <Input
            type="email" 
            onBlur={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Email"   className={error ? "border-red-500" : ""}
          />
          <MdEmail className="absolute right-3" />
        </div>
        <div>
          <Button>Continue</Button>
        </div>
      </form> :  <OtpInput email={email}  length={4} onOtpSubmit={onOtpSubmit} newPassword={newPassword} /> 
      }
      <button onClick={goBack} className="text-blue-600 font-semibold mt-3 " >  
          Go back
        </button>
    </div>
  );
};

export default ForgotPassword;
