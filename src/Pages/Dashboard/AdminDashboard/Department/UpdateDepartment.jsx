/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdateDepartment = ({ department, onClose, refetch, loading }) => {
  const [err, setErr] = useState("");
const axiosSecure = useAxiosSecure()
  const formik = useFormik({
    initialValues: {
      departmentName: department.departmentName || "",
      departmentDescription: department.departmentDescription || "",
    },

    onSubmit: async (values) => {
      const { departmentName, departmentDescription } = values;

      const info = {
        departmentName,
        departmentDescription,
      };
      console.log(info)


      try {
        const response = await axiosSecure.patch(`/departments/${department._id}`, info);
        
        // Check if response contains data and handle it
        if (response?.data?.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${info.departmentName} updated successfully`,
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
          setErr("");
          onClose(); // Close the modal if the update is successful
        } else {
          setErr("Failed to update the department.");
        }
      } catch (error) {
        console.error("Error updating department:", error);
        setErr(error.response?.data?.message || "An unexpected error occurred.");
      }
    },
  });

  return (
    <div className="modal-box relative">
      <div className="text-center">
        <CustomTitle heading={`${department?.departmentName}`} />
      </div>

      {/* Details */}
      <div className="py-4 flex-grow">
        <div>
          {!loading ? (
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="">
                  {/* Department Name */}
                  <div className="form-control">
                    <label className="font-semibold" htmlFor="departmentName">
                      Department Name
                    </label>
                    <input
                      id="departmentName"
                      name="departmentName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.departmentName}
                      placeholder="Enter Department Name"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.departmentName && formik.errors.departmentName && (
                      <div className="text-red-500">{formik.errors.departmentName}</div>
                    )}
                  </div>
                  
                  {/* Department Description */}
                  <div className="form-control">
                    <label className="font-semibold" htmlFor="departmentDescription">
                      Description
                    </label>
                    <input
                      id="departmentDescription"
                      name="departmentDescription"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.departmentDescription}
                      placeholder="Enter Description"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.departmentDescription && formik.errors.departmentDescription && (
                      <div className="text-red-500">{formik.errors.departmentDescription}</div>
                    )}
                  </div>
                </div>

                {err && <p className="text-red-600">{err}</p>}

                {/* Submit */}
                <div className="form-control mt-4">
                  <Button type="submit">Update Department</Button>
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

export default UpdateDepartment;
