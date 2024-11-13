/* eslint-disable react/prop-types */

import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCart from "@/Hooks/useCart";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const MedicineCard = ({medicine}) => {
   const { _id, isAvailable,  productCompany, stripSize, unitPrice, productImage, productName, productPower, quantity } = medicine;
   const productPrice = Number(unitPrice) * Number(stripSize)
const {userData, user} = useContext(AuthContext)
const navigate = useNavigate()
const location = useLocation()
const axiosSecure = useAxiosSecure()
const [, , refetch] = useCart()
   const handleAddToCart = (id)=>{
   
    if(user && user.email){
      const cartItem = {
        productId: id,
        email:user.email,
        
      }
      axiosSecure.post('/carts', cartItem)
      .then(res=>{
        if(res.data.success){

          Swal.fire({
  position: "center",
  icon: "success",
  title: "Added to cart",
  showConfirmButton: false,
  timer: 1500
});refetch()
        }
      }).catch(err=>console.log(err.response))
    }
    else{
      Swal.fire({
        title: "You are not logged in",
        text: "Please log in to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "login!",
        timer:3000
      }).then((result) => {
        if (result.isConfirmed) {
         navigate('/login', {state:{from:location}})
        }
      });
    }
    
    
   }
    return (
        <div className="container mx-auto mt-5 border border-gray-300 rounded-lg shadow-lg p-4  relative">
      
        
      
      <img src={productImage} alt="medicine" className="w-full border h-40 object-cover rounded-lg mb-3" />
      <h3 className="text-lg font-semibold mb-1">{productName}<span className="text-sm ml-2 text-gray-500">{productPower} </span></h3>
      <p className="text-green-600 font-medium mb-1">Tablet</p>
      <p className="text-sm text-gray-500 mb-2">Strip size: 10 Tablets</p>
      <p className="text-sm text-gray-500 mb-3">{productCompany.companyName}</p>
      <div className="flex items-center mb-4">
        <span className="text-xl font-bold text-green-600">৳ {productPrice}</span>
        <span className=" ml-20 text-cyan-500">
            {
              isAvailable === true ? "in-stock " : "out-of-stock "
            } ({quantity})
        </span>
        
      </div>
      <div>
        <div>
          <button onClick={()=>handleAddToCart(_id)} className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition duration-300">
            Add to cart
          </button>
        </div>
        <div className='text-center mt-2'>
          <Link to={`/pharmacy/medicines/${_id}`} className='underline text-blue-500 text-xl font-semibold'>Find out more &gt;&gt;</Link>
        </div>
      </div>
    </div>
    );
};

export default MedicineCard;