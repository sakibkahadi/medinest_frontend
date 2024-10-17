import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { customStyles } from "../AddDoctor/customStyle";
import Select from "react-select";
import useClinic from "@/Hooks/useClinic";
import { uploadImage } from "@/lib/imageUpload";


const AddAdmin = () => {
  const [err, setErr] = useState("");
  const axiosSecure = useAxiosSecure();
const axiosPublic = useAxiosPublic()
const [allClinic, setAllClinic] = useState([])
const [loading, setLoading] = useState(false)
const [fetch] = useClinic()

// fetch clinic
  // Fetch companies for the select options
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosPublic.get("/clinics");
        const options = Array.isArray(response.data.data)
          ? response.data.data.map((clinic) => ({
              value: clinic._id,
              label: clinic.clinicName, // Use a more user-friendly label if available
            }))
          : [];
        setAllClinic(options);
      } catch (err) {
        console.error("Error fetching companies:", err.response?.data?.message || err);
      }
    };
    fetchCompanies();
  }, [axiosPublic]);

  const formik = useFormik({
    initialValues: {
      clinicName: "",
      name: "",
      image: null,
      phoneNumber: "",
      email: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.clinicName) {
        errors.clinicName = "Clinic name is required";
      }
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.image) {
        errors.image = "Image is required";
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = "Phone number is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      
      const { clinicName, name, phoneNumber, email, image } = values;

      // Upload image to Cloudinary
      let imageUrl = null;
      if (image) {
        setLoading(true)
        imageUrl = await uploadImage(image);
        setLoading(false)
        if (!imageUrl) {
          setErr("Image upload failed");
          return;
        }
      }

      const info = {
        clinicName: clinicName.value,
        phoneNumber: "+880" + phoneNumber,
        email,
        name,
        image: imageUrl,
      };
console.log(info)
    

try{
    axiosSecure.post('/users/create-admin', info)
    .then(res=>{if(res.data.data){
      setErr("")
      
    }})
    .catch((err)=>setErr(err.response.data.errorSources[0].message    ))
   }catch(err){
    setErr(err=>setErr(err.response.data.message))
   }
    },
  });

  return (
    <div>
      <WebsiteTitle title="Add Doctor" />
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Sign in to Med Nest" />
          </CardHeader>
          <div>
            {!loading? <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2">
                  {/* Select Clinic*/}
                <div className="form-control mb-4 space-y-3">
                  <label className="font-semibold" htmlFor="clinicName">
                    clinicName
                  </label>
                  <Select
                    id="clinicName"
                    name="clinicName"
                   
                    onChange={(option) => formik.setFieldValue("clinicName", option)}
                    value={formik.values.clinicName}
                    options={Array.isArray(allClinic) ? allClinic : []}
                    styles={customStyles}
                  />
                  {formik.touched.clinicName && formik.errors.clinicName && (
                    <div className="text-red-500">
                      {formik.errors.clinicName}
                    </div>
                  )}
                </div>

                  {/* Admin Name */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="name">
                      Admin Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      placeholder="Enter Admin Name"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-red-500">{formik.errors.name}</div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="Enter your email"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500">{formik.errors.email}</div>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="image">
                      Image
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={(event) =>
                        formik.setFieldValue("image", event.currentTarget.files[0])
                      }
                      className="file-input file-input-bordered file-input-primary w-full"
                    />
                    {formik.touched.image && formik.errors.image && (
                      <div className="text-red-500">{formik.errors.image}</div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <div
                      className={`flex bg-slate-200 items-center border rounded-md ${
                        formik.errors.phoneNumber && formik.touched.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus-within:border-blue-300`}
                    >
                      <span className="flex justify-center gap-2 items-center bg-gray-200 p-2 rounded-l-md">
                        <img
                          src="https://flagcdn.com/w20/bd.png"
                          alt="BD flag"
                        />
                        <span>+880</span>
                      </span>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        placeholder="Enter your number"
                        className="px-1 text-sm flex-1 w-full rounded-r-md bg-slate-200 outline-none"
                      />
                    </div>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <div className="text-red-500">
                        {formik.errors.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>

                {err ? <p className="text-red-600">{err}</p>: ""}

                {/* Submit */}
                <div className="form-control mt-4">
                  <Button type="submit">Add Admin</Button>
                </div>
              </form>
            </CardContent> : <div>loading ....</div>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddAdmin;
