import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import {  useFormik } from "formik";

import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { AuthContext } from "@/providers/AuthProvider";
import MapComponent from "@/Pages/Clinics/MapContainer";
import { uploadImage } from "@/lib/imageUpload";
import NoData from "@/customComponents/iconComponents/NoData";


const ClinicInfo = () => {
  
  const [err, setErr] = useState("");
  const axiosPublic = useAxiosPublic();
  const [clinic, setClinic] = useState([]);
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      clinicName: "",
      phoneNumber: "",
      email: "",
      website: "",
     clinicImage:null
    },
    onSubmit: async ({ clinicName, phoneNumber, email, website, clinicImage }) => {
      phoneNumber = "+880" + phoneNumber;
      const clinicId = clinic?._id;
      let imageUrl = null;
    
      if (clinicImage) {
        setLoading(true)
       
        imageUrl = await uploadImage(clinicImage);
       setLoading(false)
        if (!imageUrl) {
          setErr("Image upload failed");
          return;
        }
      }
      // Keep existing location if selectedLocation is null
      const info = {
        clinicName,
        contact: {
          phoneNumber,
          email,
          website,
        },
        clinicImage:imageUrl
      };
      console.log(info)

      try {
        axiosPublic.patch(`/clinics/${clinicId}/admins`, info)
        .then(res=>console.log(res.data.data))
        .catch(err=>console.log(err))
      } catch (error) {
        console.error("Error updating clinic information:", error.response?.data || error);
        setErr("Failed to update clinic information. Please try again.");
      }
    },
  });

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const response = await axiosPublic.get(`/clinics/${localStorage.getItem('userId')}/admins`);
        const clinicData = response.data.data;
        setClinic(clinicData);

        // Set initial form values
        formik.setValues({
          clinicName: clinicData.clinicName || "",
          phoneNumber: clinicData.contact?.phoneNumber.slice(4) || "", // Adjusted to slice properly
          email: clinicData.contact?.email || "",
          website: clinicData.contact?.website || "",
          clinicImage:clinicData?.clinicImage || ""
        });

       
      } catch (err) {
        console.log(err.response?.data || err);
        setErr("Failed to fetch clinic data. Please try again.");
      }
    };

    fetchClinicData();
  }, [axiosPublic, ]);

  return (
    <div>
      <WebsiteTitle title="Clinic Info" />
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Clinic Info" />
          </CardHeader>
          <div>
            {!loading ? <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2">
                    {/* Clinic Name */}
                    <div className="form-control mb-4 space-y-3">
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
                      {formik.touched.clinicName && formik.errors.clinicName && (
                        <div className="text-red-500">{formik.errors.clinicName}</div>
                      )}
                    </div>
 {/* Image Upload */}
 <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="clinicImage">
                        Image
                      </label>
                      <input
                        id="clinicImage"
                        name="clinicImage"
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "clinicImage",
                            event.currentTarget.files[0]
                          )
                        }
                        className="file-input file-input-bordered file-input-primary w-full"
                      />
                    </div>
                    {/* Phone Number */}
                    <div className="form-control mb-4 space-y-3">
                      <label className="font-semibold" htmlFor="phoneNumber">
                        Phone Number
                      </label>
                      <div
                        className={`flex bg-slate-200 items-center border rounded-md ${
                          formik.errors.phoneNumber && formik.touched.phoneNumber
                            ? "border-slate-200"
                            : "border-gray-300"
                        } focus-within:border-blue-300 focus-within:border-1`}
                      >
                        <span className="flex justify-center gap-2 items-center bg-gray-200 p-2 rounded-l-md">
                          <img src="https://flagcdn.com/w20/bd.png" alt="BD flag" />
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
                          className="px-1 text-sm flex-1 h-full w-full rounded-r-md bg-slate-200 outline-none focus:ring-0"
                        />
                      </div>
                      {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <div className="text-red-500">{formik.errors.phoneNumber}</div>
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

                    {/* Website */}
                    <div className="form-control mb-4 space-y-3">
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

                  {/* Map */}
                  {
                    clinic?.location?.latitude && clinic?.location?.longitude ? <MapComponent lat={clinic?.location?.latitude} lng={clinic?.location?.longitude} /> : <div>Latitude and longitude is required</div>
                  } 
                  

                  {err && <p className="text-red-600">{err}</p>}

                  {/* Submit Button */}
                  <div className="form-control mt-4">
                    <Button type="submit">Save Clinic Info</Button>
                  </div>
                </div>
              </form>
            </CardContent>:<div>loading</div>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClinicInfo;
