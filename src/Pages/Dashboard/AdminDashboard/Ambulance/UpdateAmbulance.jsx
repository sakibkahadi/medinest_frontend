/* eslint-disable react/prop-types */
import {  useState } from "react";
import CustomTitle from "@/components/smallComponents/CustomTitle";

import { uploadImage } from "@/lib/imageUpload";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";

import { CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import ImageUploader from "../AddMedicine/ImageUploader";
import Swal from "sweetalert2";


const UpdateAmbulance = ({ ambulance, onClose, refetch }) => {


  const [imageUrl1, setImageUrl1] = useState(ambulance?.image1 || "");
  const [imageUrl2, setImageUrl2] = useState(ambulance?.image2);

  const handleImageUpload1 = async (file) => {
    const newImageUrl1 = await uploadImage(file); // Call the upload function
    if (newImageUrl1) {
      setImageUrl1(newImageUrl1); // Update the state with the new image URL
    }
    return newImageUrl1;
  };
  const handleImageUpload2 = async (file) => {
    const newImageUrl2 = await uploadImage(file); // Call the upload function
    if (newImageUrl2) {
      setImageUrl2(newImageUrl2); // Update the state with the new image URL
    }
    return newImageUrl2;
  };
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const formik = useFormik({
    initialValues: {
      title: ambulance?.title || "",
      description: ambulance?.description || "",
      image1: ambulance?.image1 || "",
      image2: ambulance?.image2 || "",
      smallDetails1: ambulance?.smallDetails?.smallDetails1 || "",
      smallDetails2: ambulance?.smallDetails?.smallDetails2 || "",
      smallDetails3: ambulance?.smallDetails?.smallDetails3 || "",
    },
    enableReinitialize:true,

    onSubmit: async (values) => {
      const {
        title,
        description,
        
        smallDetails1,
        smallDetails2,
        smallDetails3,
      } = values;

      // Upload image if available

      // Prepare the data for submission

      const info = {
        
        title: title,

        description,
        image1: imageUrl1,
        image2: imageUrl2,
        smallDetails: {
          smallDetails1: smallDetails1,
          smallDetails2: smallDetails2,
          smallDetails3: smallDetails3,
        },
      };

      console.log(info)

    //   Submit the data
      try {
        axiosSecure
          .patch(`/ambulances/${ambulance?._id}`, info)
          .then((res) => {
            if (res.data.data) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Ambulance update  successfully",
                showConfirmButton: false,
                timer: 1500
              });
              setErr("");
              console.log("update medicine");
            }
          })
          .catch((err) => Swal.fire({
            position: "center",
            icon: "error",
            title: `${err.response.data.message}`,
            showConfirmButton: false,
            timer: 1500
          }));
      } catch (err) {
        setErr((err) => setErr(err.response.data.message));
      }
    },
  });

  
  return (
    <div className="modal-box relative ">
      <div className="text-center">
        <CustomTitle heading={`${ambulance?.title}`} />
      </div>
      <div className=" flex gap-2  items-center ">
        {/* image upload */}
        <div className="  flex flex-col gap-20">
          <ImageUploader
            initialImage={imageUrl1} // Pass the updated image URL
            onUpload={handleImageUpload1} // Pass the upload function
          />
          <ImageUploader
            initialImage={imageUrl2} // Pass the updated image URL
            onUpload={handleImageUpload2} // Pass the upload function
          />
        </div>
        {/* Details */}
        <div className="py-4  flex-grow">
          <div>
            {!loading ? (
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-5">
                    {/* Ambulance Name */}
                    <div className="form-control mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="title">
                        Ambulance Name
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        placeholder="Enter Ambulance Name"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.title && formik.errors.title && (
                        <div className="text-red-500">
                          {formik.errors.title}
                        </div>
                      )}
                    </div>
                    {/* Ambulance description */}
                    <div className="form-control  mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="description">
                        Ambulance Description
                      </label>
                      <input
                        id="description"
                        name="description"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        placeholder="Add Description"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500">
                          {formik.errors.description}
                        </div>
                      )}
                    </div>

                 
                    {/* Small description */}
                    <div className="form-control  mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="smallDetails1">
                      Write short details
                      </label>
                      <input
                        id="smallDetails1"
                        name="smallDetails1"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.smallDetails1}
                        placeholder="Add small Details"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.smallDetails1 && formik.errors.smallDetails1 && (
                        <div className="text-red-500">
                          {formik.errors.smallDetails1}
                        </div>
                      )}
                    </div>
                    {/* Small smallDetails2 */}
                    <div className="form-control  mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="smallDetails2">
                        Write short details
                      </label>
                      <input
                        id="smallDetails2"
                        name="smallDetails2"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.smallDetails2}
                        placeholder="Add small details"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.smallDetails2 && formik.errors.smallDetails2 && (
                        <div className="text-red-500">
                          {formik.errors.smallDetails2}
                        </div>
                      )}
                    </div>
                    {/* Small smallDetails3 */}
                    <div className="form-control  mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="smallDetails3">
                        Write short details
                      </label>
                      <input
                        id="smallDetails3"
                        name="smallDetails3"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.smallDetails3}
                        placeholder="Add small details"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.smallDetails3 && formik.errors.smallDetails3 && (
                        <div className="text-red-500">
                          {formik.errors.smallDetails3}
                        </div>
                      )}
                    </div>
                  </div>

                  {err && <p className="text-red-600">{err}</p>}
                  {err || ""}

                  {/* Submit */}
                  <div className="form-control mt-4">
                    <Button type="submit">Update Medicine</Button>
                  </div>
                </form>
              </CardContent>
            ) : (
              <div>loading .....</div>
            )}
          </div>
        </div>
      </div>

      {/* modal */}
      <div className="modal-action">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose} // Close the modal
          >
            ✕
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAmbulance;
