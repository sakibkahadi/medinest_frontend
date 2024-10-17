import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";
import { useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { uploadImage } from "@/lib/imageUpload";

const AddAmbulance = () => {
  const [err, setErr] = useState("");
  const axiosSecure = useAxiosSecure();
  const superAdmin = localStorage.getItem("userId")
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image1: null,
      image2: null,
      smallDetails1: "",
      smallDetails2: "",
      smallDetails3: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.title) {
        errors.title = "title is required";
      }
      if (!values.description) {
        errors.description = "description is required";
      }
      if (!values.image1) {
        errors.image1 = "image1 is required";
      }
      if (!values.image2) {
        errors.image2 = "image2 is required";
      }
      if (!values.smallDetails1) {
        errors.smallDetails1 = "smallDetails1 is required";
      }
      if (!values.smallDetails2) {
        errors.smallDetails2 = "smallDetails2 is required";
      }
      if (!values.smallDetails3) {
        errors.smallDetails3 = "smallDetails3 is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const {
        title,
        description,
        image1,
        image2,
        smallDetails1,
        smallDetails2,
        smallDetails3,
      } = values;

      // Upload image1 to Cloudinary
        let imageUrl1 = null;
    
        if (image1) {
          setLoading(true)
          imageUrl1 = await uploadImage(image1);
         setLoading(false)
          if (!imageUrl1) {
            setErr("Image 1 upload failed");
            return;
          }
        }
      // Upload image2 to Cloudinary
        let imageUrl2 = null;
    
        if (image2) {
          setLoading(true)
          imageUrl2 = await uploadImage(image2);
         setLoading(false)
          if (!imageUrl2) {
            setErr("Image 2 upload failed");
            return;
          }
        }



      const info = {
        admin: superAdmin,
        title: title,

        description,
        image1: imageUrl1,
        image2: imageUrl2,
       smallDetails:{
        smallDetails1:smallDetails1,
        smallDetails2:smallDetails2,
        smallDetails3:smallDetails3
       }
      };
      console.log(info);

      try {
        axiosSecure
          .post("/ambulances", info)
          .then((res) => {
            if (res.data.data) {
              setErr("");
              console.log('created')
            }
          })
          .catch((err) => setErr(err.response.data.errorSources[0].message));
      } catch (err) {
        setErr((err) => setErr(err.response.data.message));
      }
    },
  });

  return (
    <div>
      <WebsiteTitle title="Add Doctor" />
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Add Ambulance" />
          </CardHeader>
          <div>
            {!loading ? (
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2">
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
                        value={formik.values.name}
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
                    <div className="form-control lg:col-span-2 mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="description">
                        Ambulance Description
                      </label>
                      <input
                        id="description"
                        name="description"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        placeholder="Add Description"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500">
                          {formik.errors.description}
                        </div>
                      )}
                    </div>

                    {/* Image Upload 1 */}
                    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="image1">
                        Ambulance Image
                      </label>
                      <input
                        id="image1"
                        name="image1"
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "image1",
                            event.currentTarget.files[0]
                          )
                        }
                        className="file-input file-input-bordered file-input-primary w-full"
                      />
                    </div>
                    {/* Image Upload 2 */}
                    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="image2">
                        Ambulance Image
                      </label>
                      <input
                        id="image2"
                        name="image2"
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "image2",
                            event.currentTarget.files[0]
                          )
                        }
                        className="file-input file-input-bordered file-input-primary w-full"
                      />
                    </div>

                    {/* Small description */}
                    <div className="form-control lg:col-span-2 mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="smallDetails1">
                      Write short details
                      </label>
                      <input
                        id="smallDetails1"
                        name="smallDetails1"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
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
                    <div className="form-control lg:col-span-2 mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="smallDetails2">
                        Write short details
                      </label>
                      <input
                        id="smallDetails2"
                        name="smallDetails2"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
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
                    <div className="form-control lg:col-span-2 mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="smallDetails3">
                        Write short details
                      </label>
                      <input
                        id="smallDetails3"
                        name="smallDetails3"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
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

                  {err ? <p className="text-red-600">{err}</p> : ""}

                  {/* Submit */}
                  <div className="form-control mt-4">
                    <Button type="submit">Add Ambulance</Button>
                  </div>
                </form>
              </CardContent>
            ) : (
              <div>loading ....</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddAmbulance;
