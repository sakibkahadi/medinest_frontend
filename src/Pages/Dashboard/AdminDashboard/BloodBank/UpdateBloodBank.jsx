/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/Hooks/useAxiosSecure";


const UpdateBloodBank = ({ blood, onClose, refetch, loading }) => {
   
  const [err, setErr] = useState("");
const axiosSecure = useAxiosSecure()
// Function to handle numeric input
const handleNumericInput = (e) => {
  const { name, value } = e.target;

  // Only allow numbers and decimal points
  const isValidNumber = /^[0-9]*\.?[0-9]*$/.test(value);

  if (isValidNumber) {
    formik.setFieldValue(name, value);
  }
};
  const formik = useFormik({
    initialValues: {
     
      quantity:blood.quantity || ""
     
    },

    onSubmit: async (values) => {
      const {  quantity } = values;

      const info = {
        quantity
      };
      


      try {
        const response = await axiosSecure.patch(`/bloodBank/${blood._id}`, info);
        
        // Check if response contains data and handle it
        if (response?.data?.data) {
          refetch();
          setErr("");
          onClose(); // Close the modal if the update is successful
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
            
                  
                  {/* Department Description */}
                  <div className="form-control">
                    <label className="font-semibold" htmlFor="quantity">
                      Blood Quantity
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
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