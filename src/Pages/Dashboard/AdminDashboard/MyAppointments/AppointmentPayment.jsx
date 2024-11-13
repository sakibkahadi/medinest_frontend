import CustomTitle from "@/components/smallComponents/CustomTitle";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";




import { BiDollar } from "react-icons/bi";
import AppointmentCheckOutForm from "./AppointmentCheckOutForm";


const AppointmentPayment = ({ price, _id, refetch }) => {
   
    price = Number(price)
    
    const convertIntoDollar = price/120
    console.log(_id)
  

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

  return (
    <div className="p-4 space-y-5">
      <CustomTitle heading={`Payment `}/>
     <div className="flex items-center gap-1 text-blue-950"><BiDollar /> <span>{convertIntoDollar}</span></div>
      <div>
        <Elements stripe={stripePromise}>
            <AppointmentCheckOutForm refetch={refetch} price={convertIntoDollar} quantity={2} _id={_id} / >
        </Elements>
      </div>
    </div>
  );
};

export default AppointmentPayment;