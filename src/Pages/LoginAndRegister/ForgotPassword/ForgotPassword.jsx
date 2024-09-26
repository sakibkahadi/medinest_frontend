import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const goBack = () => {
    window.history.back();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const details = {
      email: email,
    };
    console.log(details);
 
  };
  return (
    <div className="md:w-1/2 mx-auto">
      <form onSubmit={onSubmit}>
        <div className="flex items-center relative mb-6">
          <Input
            type="email"
            onBlur={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Email"
          />
          <MdEmail className="absolute right-3" />
        </div>
        <div>
          <Button>Reset Password</Button>
        </div>
      </form>
      <button onClick={goBack} className="text-blue-600 font-semibold mt-3 " >  
          Go back
        </button>
    </div>
  );
};

export default ForgotPassword;
