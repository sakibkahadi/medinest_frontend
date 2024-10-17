import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Select from "react-select";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";
import { customStyles } from "./customStyle";
import { generateTimeOptions } from "@/lib/generateTime";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/imageUpload";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const AddDoctor = () => {
  const axiosPublic = useAxiosPublic();
  const timeOptions = generateTimeOptions();
  const [allDepartment, setAllDepartment] = useState("");
  const [error, setError] = useState("");
  const [clinic, setClinic] = useState("");
  const [loading, setLoading] = useState(false)
const axiosSecure = useAxiosSecure()
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];
  //fetch clinicData
  useEffect(() => {
    axiosPublic
      .get(`/clinics/${localStorage.getItem("userId")}/admins`)
      .then((res) => setClinic(res.data.data._id))
      .catch((err) => setError(err.response.data));
  }, [axiosPublic]);
  // Fetch departments for the select options
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosPublic.get("/departments");
        const options = Array.isArray(response.data.data)
          ? response.data.data.map((department) => ({
              value: department._id,
              label: department.departmentName, // Use a more user-friendly label if available
            }))
          : [];
        setAllDepartment(options);
      } catch (err) {
        console.error(
          "Error fetching departments:",
          err.response?.data?.message || err
        );
      }
    };
    fetchDepartments();
  }, [axiosPublic]);

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      phoneNumber: "",
      email: "",

      department: "",
      experience: "",
      feesPerConsultation: "",
      startTime: "",
      endTime: "",
      doctorImage: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = " name is required";
      }
     if(!values.gender){
      errors.gender = "Gender is required";
     }
      if (!values.phoneNumber) {
        errors.phoneNumber = "Phone number is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }
      if(!values.doctorImage){
        errors.doctorImage = "image is required";
      }
      if (!values.department) {
        errors.department = "Department is required";
      }
      if (!values.experience) {
        errors.experience = "Experience is required";
      }
      if (!values.feesPerConsultation) {
        errors.feesPerConsultation = "Fees per consultation is required";
      }
      if (!values.startTime) {
        errors.startTime = 'Start time is required';
      }
      if (!values.endTime) {
        errors.endTime = 'End time is required';
      }
      if (values.startTime && values.endTime && values.startTime >= values.endTime) {
        errors.endTime = 'End time must be later than start time';
      }
      return errors;
    },
    onSubmit: async ({
      name,
      gender,
      phoneNumber,
      email,

      department,
      experience,
      feesPerConsultation,
      startTime,
      endTime,
      doctorImage,
    }) => {
      console.log("hi");
      let imageUrl = "";

      if (doctorImage) {
        setLoading(true)
        imageUrl = await uploadImage(doctorImage);
setLoading(false)
        if (!imageUrl) {
          console.log("Image upload failed");
          return;
        }
      }
      phoneNumber = `+880${phoneNumber}`
      const info = {
        image: imageUrl,
        clinicName: clinic,
        name,
        gender,
        phoneNumber,
        email,

        department: department.value,
        experience,
       consultationFee: feesPerConsultation,
        startTime,
        endTime,
      };
      console.log(info)
     try{
      axiosSecure.post('/users/create-doctor', info)
      .then(res=>{
        if(res.data.data){
          setError("")
        }

      }).catch(err=>setError(err.response.data.errorSources[0].message))
     }catch(err){
      setError(err)
     }

      // Here, you can send 'info' to your backend
    },
  });
  // Function to handle numeric input
  const handleNumericInput = (e) => {
    const { name, value } = e.target;

    // Only allow numbers and decimal points
    const isValidNumber = /^[0-9]*\.?[0-9]*$/.test(value);

    if (isValidNumber) {
      formik.setFieldValue(name, value);
    }
  };
  return (
    <div>
      <WebsiteTitle title="Add Doctor" />
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Add Doctor" />
          </CardHeader>
          <CardContent>
           {
            !loading ?  <form onSubmit={formik.handleSubmit}>
            {/* Personal details */}
            <div>
              <h1 className="font-semibold text-xl mb-5">
                Personal Details:
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2">
                {/* First Name */}
                <div className="form-control mb-4 space-y-3">
                  <label className="font-semibold" htmlFor="name">
                    Doctor Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Enter doctor name"
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
                    placeholder="Enter doctor email"
                    className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="form-control mb-4 space-y-4">
                  <label className="font-semibold" htmlFor="doctorImage">
                    Image
                  </label>
                  <input
                    id="doctorImage"
                    name="doctorImage"
                    type="file"
                    onChange={(event) =>
                      formik.setFieldValue(
                        "doctorImage",
                        event.currentTarget.files[0]
                      )
                    }
                    className="file-input file-input-bordered file-input-primary w-full"
                  />
                   {formik.touched.doctorImage && formik.errors.doctorImage && (
                    <div className="text-red-500">{formik.errors.doctorImage}</div>
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
                        ? "border-slate-200"
                        : "border-gray-300"
                    } focus-within:border-blue-300 focus-within:border-1`}
                  >
                    <span className="flex justify-center gap-2 items-center bg-gray-200 p-2 rounded-l-md">
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
                      className="px-1 text-sm flex-1 h-full w-full rounded-r-md bg-slate-200 outline-none focus:ring-0"
                    />
                  </div>
                  {formik.touched.phoneNumber &&
                    formik.errors.phoneNumber && (
                      <div className="text-red-500">
                        {formik.errors.phoneNumber}
                      </div>
                    )}
                </div>
                {/* gender */}
                <div className="form-control mb-4 space-y-3">
                  <label className="font-semibold" htmlFor="gender">
                    Gender
                  </label>
                  <Select
                    id="gender"
                    name="gender"
                    options={genderOptions}
                    onChange={(option) =>
                      formik.setFieldValue("gender", option.value)
                    }
                    styles={customStyles}
                    value={
                      genderOptions.find(
                        (option) => option.value === formik.values.gender
                      ) || null
                    }
                    className="full"
                  />
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="text-red-500">{formik.errors.gender}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div>
              <h1 className="font-semibold text-xl mb-5">
                Professional Details:
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2">
                {/* Department */}
                <div className="form-control mb-4 space-y-3">
                  <label className="font-semibold" htmlFor="department">
                    Department
                  </label>
                  <Select
                    id="department"
                    name="department"
                    options={allDepartment}
                    onChange={(option) =>
                      formik.setFieldValue("department", option)
                    }
                    styles={customStyles}
                    value={formik.values.department}
                  />
                  {formik.touched.department && formik.errors.department && (
                    <div className="text-red-500">
                      {formik.errors.department}
                    </div>
                  )}
                </div>
                {/* Experience */}
                <div className="form-control mb-4 space-y-3">
                  <label className="font-semibold" htmlFor="experience">
                    Experience (Years)
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="text"
                    onChange={handleNumericInput}
                    onBlur={formik.handleBlur}
                    value={formik.values.experience}
                    placeholder="Enter experience"
                    className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                  />
                  {formik.touched.experience && formik.errors.experience && (
                    <div className="text-red-500">
                      {formik.errors.experience}
                    </div>
                  )}
                </div>
                {/* Fees Per Consultation */}
                <div className="form-control mb-4 space-y-3">
                  <label
                    className="font-semibold"
                    htmlFor="feesPerConsultation"
                  >
                    Fees Per Consultation
                  </label>
                  <input
                    id="feesPerConsultation"
                    name="feesPerConsultation"
                    type="text"
                    onChange={handleNumericInput}
                    onBlur={formik.handleBlur}
                    value={formik.values.feesPerConsultation}
                    placeholder="Enter fees"
                    className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                  />
                  {formik.touched.feesPerConsultation &&
                    formik.errors.feesPerConsultation && (
                      <div className="text-red-500">
                        {formik.errors.feesPerConsultation}
                      </div>
                    )}
                </div>
                {/* Start Time */}
                <div className="form-control mb-4 space-y-3">
                  <label className="font-semibold" htmlFor="startTime">
                    Start Time
                  </label>
                  <Select
                    id="startTime"
                    name="startTime"
                    options={timeOptions}
                    onChange={(option) =>
                      formik.setFieldValue("startTime", option.value)
                    }
                    styles={customStyles}
                    value={
                      timeOptions.find(
                        (option) => option.value === formik.values.startTime
                      ) || null
                    }
                    className="full"
                  />
                  {formik.touched.startTime && formik.errors.startTime && (
                    <div className="text-red-500">
                      {formik.errors.startTime}
                    </div>
                  )}
                </div>

                {/* End Time */}
                <div className="form-control mb-4 space-y-3">
                  <label className="font-semibold" htmlFor="endTime">
                    End Time
                  </label>
                  <Select
                    id="endTime"
                    name="endTime"
                    options={timeOptions}
                    onChange={(option) =>
                      formik.setFieldValue("endTime", option.value)
                    }
                    styles={customStyles}
                    value={
                      timeOptions.find(
                        (option) => option.value === formik.values.endTime
                      ) || null
                    }
                    className="full"
                  />
                  {formik.touched.endTime && formik.errors.endTime && (
                    <div className="text-red-500">
                      {formik.errors.endTime}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {error ? <p className="text-red-400">{error}</p> : ""}
            {/* Submit Button */}
            <div className="mt-5">
              <Button type="submit" className="w-full">
                Add Doctor
              </Button>
            </div>
          </form> : <p className="text-red-500">loading.....</p>
           }
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddDoctor;
