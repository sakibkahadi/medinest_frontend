import { useLoaderData } from "react-router-dom";

const MedicineDetails = () => {
  let loaderData = useLoaderData();
  loaderData = loaderData?.data;
  console.log(loaderData);
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
  const productPrice = Number(stripSize)* Number(unitPrice)
  return (
    <div className=" p-2 w-full md:w-3/4 mx-auto grid space-y-6">
      <div className=" grid gap-5 grid-cols-1 md:grid-cols-3 ">
        <figure className=" md:col-span-2 flex gap-5 flex-col  ">
          <div className="border border-slate-200 flex gap-5 relative">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie"
              className="w-12 md:w-20 h-12 md:h-20 p-2 border m-2 "
            />{" "}
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie"
              className=" w-full p-2  h-96"
            />
          </div>
         
        </figure>
        <div className="card-body text-2xl !p-5 h-full  w-full border border-slate-200">
          <div>
            <div className="space-y-2">
              <h2 className="font-bold ">{productName}</h2>
              <div className="flex !text-xl font-semibold text-slate-600- gap-1">
                <span>{productType} </span> <span>({productPower})</span>
              </div>
            </div>

            <div className="divider !h-1 !mt-[4px] !mb-[4px] "></div>

            <div className="flex text-xl gap-5 pt-3 pb-3 items-center">
              <img
                className="w-10 h-10"
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="company"
              />{" "}
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
                isAvailable === true ? <button className="btn btn-accent">Add to Cart</button> :<p className="text-cyan-800 ">Out of Stock</p>
            }

{/* {
              isAvailable === true ? "in-stock " : "out-of-stock "
            } ({quantity})
             */}
          </div>
        </div>
      </div>
       {/* safe or not */}
       <div className="grid lg:grid-cols-3 gap-5">
       <div className=" border  md:col-span-2 border-slate-200">
            <div>
              <h1 className="text-xl font-bold p-4">Safety Advices: {productName}</h1>
            </div>
            <div className="divider !h-1 !mt-[4px] !mb-[4px] "></div>
            <div className="flex flex-col gap-5 p-2">
              {/* 1*/}
              <div className=" grid grid-cols-5 items-center">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  className=" size-20 rounded-full     "
                  alt=""
                />
                <div className="space-y-3 col-span-4">
                  <p className="py-2 px-5 w-20 bg-red-800 text-white rounded-lg">
                    SAFE
                  </p>
                  <p>
                    Consuming alcohol with {productName} does not cause any harmful
                    side effects
                  </p>
                </div>
              </div>
              {/* 2 */}
              <div className="grid grid-cols-5 items-center">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  className=" size-20 rounded-full   "
                  alt=""
                />
                <div className="space-y-3 col-span-4">
                  <p className="py-2 px-5 w-20 bg-red-800 text-white rounded-lg">
                    SAFE
                  </p>
                  <p>
                  {productName} does not usually affect your ability to drive
                  </p>
                </div>
              </div>
              
              {/* 3 */}
              <div className="grid grid-cols-5 items-center">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  className=" size-20 rounded-full   "
                  alt=""
                />
                <div className="space-y-3 col-span-4">
                  <p className="py-2 px-5 w-56 bg-orange-700 text-white rounded-lg">
                    CONSULT YOUR DOCTOR
                  </p>
                  <p>
                   There is limited information available on the use of {productName} in patients with kidney disease. Please consult your doctor
                  </p>
                </div>
              </div>
              {/* 4 */}
              <div className="grid grid-cols-5 items-center">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  className=" size-20 rounded-full   "
                  alt=""
                />
                <div className="space-y-3 col-span-4">
                  <p className="py-2 px-5 w-56 bg-orange-700 text-white rounded-lg">
                    CONSULT YOUR DOCTOR
                  </p>
                  <p>
                   There is limited information available on the use of {productName} in patients with liver disease. Please consult your doctor
                  </p>
                </div>
              </div>
              
            </div>
          </div>
       </div>
         <div className="grid lg:grid-cols-3 gap-5">
             {/* medicine info */}
          <div className=" border md:col-span-2  border-slate-200">
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
