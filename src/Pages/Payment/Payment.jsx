import { useMemo, useState } from "react";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { BiDollar } from "react-icons/bi";
import { FaMinus, FaPlus } from "react-icons/fa";

const Payment = ({ price, quantity: availableQuantity, _id }) => {
  const [quantity, setQuantity] = useState(1); 
  const convertIntoDollar = Number(((price * quantity) / 120).toFixed(2));
  const stripePromise = useMemo(() => loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK), []);
  

  // Increment quantity
  const incrementQuantity = () => {
    if (quantity < availableQuantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };



  return (
    <div className="p-4 space-y-5">
      <CustomTitle heading={`Payment`} />
      {/* Quantity selection */}
      <div>
        <div>Available Quantity: {availableQuantity}</div>
        <div className="flex items-center gap-2">
          <span>Choose Quantity:</span>
          <FaMinus size={10} color="red" onClick={decrementQuantity}  />
          <span>{quantity}</span>
          <FaPlus  size={10} color="green" onClick={incrementQuantity}/>
        </div>
      </div>
      {/* Total bill */}
      <div className="flex flex-wrap gap-5">
        <span>Total bill:</span>
        <div className="flex items-center gap-1 text-blue-950">
          <BiDollar />
          <span>{convertIntoDollar}</span>
        </div>
      </div>
      {/* Checkout form */}
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm  price={convertIntoDollar} quantity={quantity} _id={_id} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
