import NoData from "@/customComponents/iconComponents/NoData";


import usePaymentHistory from "@/Hooks/usePaymentHistory";





const PaymentHistory = () => {
  const [paymentHistory] = usePaymentHistory();

console.log(paymentHistory)
  
  
  return (
    <div>
      {paymentHistory?.length > 0 ? (
        <table className="table">
          {/* head */}

          <thead>
            <tr>
              <th>Date</th>
              <th>My Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
            {
                paymentHistory.map(payment=><h1>{payment._id}</h1>)
            }
          <tbody>
           
          </tbody>
        </table>
      ) : (
        <NoData />
      )}
     
    </div>
  );
};

export default PaymentHistory;
