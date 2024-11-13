import NoData from '@/customComponents/iconComponents/NoData';
import useCart from '@/Hooks/useCart';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import CartPayment from './CartPayment';

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    const unitPrice = Number(cartItem?.productDetails?.unitPrice) || 0;
    const stripSize = Number(cartItem?.productDetails?.stripSize) || 0;
    const totalQuantity = Number(cartItem?.totalQuantity) || 0;

    // Calculate the price for the current cart item
    const itemTotalPrice = unitPrice * stripSize * totalQuantity;

    // Add the current item's total price to the overall total
    return total + itemTotalPrice;
  }, 0);
};

const CartList = () => {
  const [carts, , refetch] = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [convertedPrice, setConvertedPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [medicineQuantity, setMedicineQuantity] = useState(0);
console.log(carts)
  const totalPrice = calculateTotalPrice(carts);
  const totalQuantitySum = carts.reduce((sum, cart) => sum + cart.totalQuantity, 0);

  const handlePayClick = () => {
    setConvertedPrice(totalPrice);
    setTotalQuantity(totalQuantitySum);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div>
      {carts.length > 0 ? (
         <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
            {/* Table Head */}
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Stripe Price</th>
                <th>Unit Price</th>
                <th>Total </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {carts?.map((cart) => {
                // Calculate total price based on product details and quantity
                const totalPrice =
                  Number(cart?.productDetails?.unitPrice) *
                  Number(cart?.productDetails?.stripSize) *
                  cart?.totalQuantity;

                return (
                  <tr key={cart.productId}>
                    <th>{cart.productDetails.productName}</th>
                    <td>{cart?.totalQuantity}</td>

                    <td>{cart.productDetails.stripSize}</td>
                    <td>{cart.productDetails.unitPrice}</td>
                    <td>{totalPrice}</td>
              
                    
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Single Pay Button */}
          <div className="mt-4 mr-5 flex justify-end">
            <button
              onClick={handlePayClick}
              className="btn btn-primary"
              disabled={totalPrice === 0 } // Disable if no items are in the cart
            >Pay {totalPrice} 
            </button>
          </div>
        </div>
      ) : (
        <NoData />
      )}

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <CartPayment
              totalQuantity={totalQuantity}
              medicineQuantity={medicineQuantity}
              refetch={refetch}
              price={convertedPrice}
              _id={selectedId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
