import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";

import ClinicMap from "./ClinicMap";
import { useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";


const AddClinic = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [err,setErr] = useState("")
const axiosSecure = useAxiosSecure()
  const formik = useFormik({
    initialValues: {
      clinicName: "",
      phoneNumber: "",
      email: "",
      website: "",
      address: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.clinicName) {
        errors.clinicName = "Clinic name is Required";
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = "Phone number is Required";
      }
      if (!values.email) {
        errors.email = "email is Required";
      }
      if (!selectedLocation) {
        errors.address = "Location is required";
      }

      return errors;
    },
    onSubmit: async ({ clinicName, phoneNumber, email, website }) => {
      phoneNumber = '+880'+phoneNumber
     
      const info = {
        clinicName,
        contact:{
            phoneNumber,
            email,
            website,
        },
       
       location: selectedLocation, 
       
      };
      console.log(info)
     try{
      axiosSecure.post('/clinics', info)
      .then(res=>console.log(res.data.data))
      .catch((err)=>setErr(err.response.data.message))
     }catch(err){
      setErr(err)
     }
    },
  });

  return (
    <div>
      <WebsiteTitle title="Add Doctor"></WebsiteTitle>
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Clinic Info"></CustomTitle>
          </CardHeader>
          <div>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                {/* personal details */}
                <div className="">
                  <h1 className="font-semibold text-xl mb-5">
                    Personal Details :{" "}
                  </h1>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2">
                    {/* 1st row */}

                    {/* clinicName */}
                    <div className="form-control mb-4 space-y-3 ">
                      <label className="font-semibold" htmlFor="clinicName">
                        Clinic Name
                      </label>
                      <input
                        id="clinicName"
                        name="clinicName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.clinicName}
                        placeholder="Enter Clinic Name"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.clinicName &&
                        formik.errors.clinicName && (
                          <div className="text-red-500">
                            {formik.errors.clinicName}
                          </div>
                        )}
                    </div>

                    {/* phoneNumber */}
                    <div className="form-control mb-4 space-y-3 ">
                      <label className="font-semibold" htmlFor="phoneNumber">
                        Phone Number
                      </label>
                      <div
                        className={` flex bg-slate-200 items-center border rounded-md ${
                          formik.errors.phoneNumber &&
                          formik.touched.phoneNumber
                            ? " border-slate-200"
                            : "border-gray-300 "
                        } focus-within:border-blue-300 focus-within:border-1`}
                      >
                        <span className="flex justify-center gap-2 items-center  bg-gray-200 p-2 rounded-l-md">
                          <img
                            className=""
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
                          className="px-1 text-sm flex-1 h-full  w-full rounded-r-md bg-slate-200 outline-none focus:ring-0"
                        />
                      </div>
                      {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber && (
                          <div className="text-red-500">
                            {formik.errors.phoneNumber}
                          </div>
                        )}
                    </div>

                    {/* email */}
                    <div className="form-control mb-4 space-y-3 ">
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
                        <div className="text-red-500">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>

                    {/* website */}
                    <div className="form-control mb-4 space-y-3 ">
                      <label className="font-semibold" htmlFor="website">
                        Website
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.website}
                        placeholder="Enter Website"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                    </div>
                  </div>

                  {/* map */}
                  <div className="mt-8">
                    <ClinicMap
                      onLocationSelect={(location) =>
                        setSelectedLocation(location)
                      }
                    />
                  </div>

                  {/* address */}
                  {formik.touched.address && formik.errors.address && (
                    <div className="text-red-500">{formik.errors.address}</div>
                  )}

                  {
                    err && <p className="text-red-600">{err}</p>
                  }

                  {/* submit */}
                  <div className="form-control mt-4">
                    <Button type="submit">Add Clinic</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddClinic;
