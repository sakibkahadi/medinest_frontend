/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";



const UpdateBloodBank = ({ blood, onClose, refetch, loading }) => {
   
  const [err, setErr] = useState("");
const axiosSecure = useAxiosSecure()

const handleNumericInput = (e) => {
  const { name, value } = e.target;


  const isValidNumber = /^[0-9]*\.?[0-9]*$/.test(value) && (parseFloat(value) >= 1 || value === "");

  if (isValidNumber) {
    formik.setFieldValue(name, value);
  }
};

  const formik = useFormik({
    initialValues: {
     
      quantity:blood.quantity || "",
     price: blood.price || "",
    clinicName: blood.clinicName._id,
    bloodGroup:blood.bloodGroup,
 
    },

    onSubmit: async (values) => {
      const {  quantity,price, clinicName , bloodGroup, } = values;

      const info = {
        quantity,price, clinicName, bloodGroup, 
      };
      console.log(info)


      try {
        const response = await axiosSecure.put(`/bloodBank/${blood._id}`, info);
        

        if (response?.data?.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Update successfully`,
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
          setErr("");
          onClose(); 
        } else {
          setErr("Failed to update the blood");
        }
      } catch (error) {
        console.error("Error updating blood:", error);
        setErr(error.response?.data?.message || "An unexpected error occurred.");
      }
    },
  });

  return (
    <div className="modal-box relative">
      <div className="text-center">
        <CustomTitle heading="Update Blood " />
      </div>

      {/* Details */}
      <div className="py-4 flex-grow">
        <div>
          {!loading ? (
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="">
            
                  
                  {/* Quantity */}
                  <div className="form-control">
                    <label className="font-semibold" htmlFor="quantity">
                      Blood Quantity
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="text" min={1}
                      onChange={handleNumericInput}
                      onBlur={formik.handleBlur}
                      value={formik.values.quantity}
                      placeholder="Enter Description"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className="text-red-500">{formik.errors.quantity}</div>
                    )}
                  </div>
                  {/* price */}
                  <div className="form-control">
                    <label className="font-semibold" htmlFor="price">
                      Blood Price
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      onChange={handleNumericInput}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                      placeholder="Enter Description"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="text-red-500">{formik.errors.price}</div>
                    )}
                  </div>
                </div>

                {err && <p className="text-red-600">{err}</p>}

                {/* Submit */}
                <div className="form-control mt-4">
                  <Button type="submit">Update Blood</Button>
                </div>
              </form>
            </CardContent>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      {/* Modal close button */}
      <div className="modal-action">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
      </div>
    </div>
  );
};



export default UpdateBloodBank;