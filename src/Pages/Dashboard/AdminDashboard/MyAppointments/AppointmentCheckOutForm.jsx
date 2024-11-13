import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AppointmentCheckOutForm = ({ price,  _id ,refetch}) => {
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState('');
  const patientId = localStorage.getItem('userId');

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: price })
      .then(res => {
        setClientSecret(res.data.clientSecret);
        console.log(res.data.clientSecret);
      });
  }, [axiosSecure, price]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card', card
    });

    if (error) {
      console.log('payment error', error);
      setError(error.message);
    } else {
      console.log('payment method', paymentMethod);
      setError('');
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'unknown',
          name: user?.displayName || 'unknown'
        }
      }
    });

    if (confirmError) {
      console.log('confirm error');
    } else {
      console.log('payment intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id)
        const payment = {
          email: user?.email,
          patient: patientId,
          price: price,
          transactionId: paymentIntent.id, 
          date: formatDate(new Date()),
        
        };
        
            axiosSecure.post('/payments', payment)
            .then(res=>{if(res.data.success){
                const status = 'confirmed'
                console.log('created') ;
                axiosSecure.patch(`/appointments/${_id}`, {status:status})
                .then(res=>{
                    if(res.data.data){
                      refetch()
                      Swal.fire({
                        position: "down-end",
                        icon: "success",
                        title: `Payment successfully. Transaction id ${transactionId}`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                        console.log('updated status')
                    }
                }).catch(err=>setError(err.response.data.message))
                
            }}).catch(err=>{setError(err.response.data.errorSources[0].message); setTransactionId("")})
        
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border rounded-lg p-4 bg-gray-50 shadow-inner">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                backgroundColor: 'transparent',
                padding: '10px',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
                backgroundColor: 'transparent',
              },
            },
          }}
        />
      </div>
      <button className='btn btn-sm my-5 btn-primary' type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className='text-red-600'>{error}</p>
      
    </form>
  );
};



export default AppointmentCheckOutForm;
