import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCart from "@/Hooks/useCart";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MedicineDetails = () => {
  let loaderData = useLoaderData();
  loaderData = loaderData?.data;
  console.log(loaderData);

  const { user} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const axiosSecure = useAxiosSecure()
  const [, , refetch] = useCart()
   
  const {
    _id,
    isAvailable,
    productCompany,
    stripSize,
    unitPrice,
    productImage,
    productName,
    productPower,
    quantity,
    genericName, shortDescription,productType, longDescription

  } = loaderData;
  const productPrice = Number(unitPrice) * Number(stripSize)
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
    <div className=" p-2 w-full md:w-3/4 mx-auto grid space-y-6">
      <div className=" grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <figure className=" md:col-span-2 flex gap-5 flex-col  ">
          <div className="border border-slate-200 flex gap-5 relative">
            
            <img
              src={productImage}
              alt="Movie"
              className="  w-full p-2  h-96"
            />
          </div>
         
        </figure>
        <div className="card-body md:col-span-2 lg:col-span-1 text-2xl !p-5 h-full  w-full border border-slate-200">
          <div>
            <div className="space-y-2">
              <h2 className="font-bold ">{productName}</h2>
              <div className="flex !text-xl font-semibold text-slate-600- gap-1">
                <span>{productType} </span> <span>({productPower})</span>
              </div>
            </div>

            <div className="divider !h-1 !mt-[4px] !mb-[4px] "></div>

            <div className=" text-xl  pt-3 pb-3 ">
              
              <span>{productCompany.companyName}</span>
            </div>
            <div className="divider !h-1 !mt-[4px] !mb-[4px] "></div>
            <p className="!text-lg">{genericName.genericName}</p>
            <div className="divider !h-1 !mt-[4px] !mb-[4px] "></div>
            <div className="text-lg flex flex-col ">
              <span className="font-thin">{stripSize} {productType} in (1Strip)</span>
              <span className="font-bold"> {"\u09F3"}  {productPrice}</span>
            </div>
          </div>

          

          <div className="card-actions justify-end">
            {
                isAvailable === true ? <button onClick={()=>handleAddToCart(_id)} className="btn btn-accent" >Add to Cart</button> :<p className="text-cyan-800 ">Out of Stock</p>
            }

{/* {
              isAvailable === true ? "in-stock " : "out-of-stock "
            } ({quantity})
             */}
          </div>
        </div>
      </div>
       {/* safe or not */}
       
         <div className="grid  lg:grid-cols-3 gap-5">
             {/* medicine info */}
          <div className=" w-full h-full border md:col-span-2  border-slate-200">
          <div>
              <h1 className="text-l font-bold p-4">Medicine Overview of {productName} {productPower} {productType}</h1>
            </div>
            <div className="divider !h-1 !mt-[4px] !mb-[4px] "></div>
            <div>
                <h2 className="text-lg font-bold p-4 text-[#0e7673]">Introduction</h2>

                <p className="text-sm text-black font-normal px-4">{shortDescription}</p>
                <h2 className="text-lg font-bold p-4 text-[#0e7673]">Brief Description</h2>

<p className="text-sm text-black font-normal py-4 px-4">{longDescription}</p>


            </div>
          </div>
         </div>
    </div>
  );
};

export default MedicineDetails;
