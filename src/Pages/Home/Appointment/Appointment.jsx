import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { customStyles } from "@/Pages/Dashboard/AdminDashboard/AddDoctor/customStyle";
import Select from "react-select";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const Appointment = () => {
  const axiosPublic = useAxiosPublic();
  const [allClinic, setAllClinic] = useState([])
  const [allDepartment, setAllDepartment] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState("")
  const [allDoctor, setAllDoctor] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    const formattedDate = date
      ? new Intl.DateTimeFormat("en-GB").format(date) // Converts to DD/MM/YYYY
      : null;
    setSelectedDate(date);
    formik.setFieldValue("date", formattedDate);
    setShowCalendar(false); // Close modal after date selection
  };

  // Fetch clinics
  useEffect(() => {
    try {
      axiosPublic
        .get("/clinics")
        .then((res) => {
          const options = res.data.data.map((clinic) => ({
            value: clinic._id,
            label: `${clinic.clinicName}`,
          }));
          setAllClinic(options);
        
        })
        .catch((err) => console.log(err.response.data.message));
    } catch (err) {
      console.log(err.response.data.message);
    }
  }, [axiosPublic]);
  // Fetch departments
  useEffect(() => {
    try {
      axiosPublic
        .get("/departments")
        .then((res) => {
          const options = res.data.data.map((department) => ({
            value: department._id,
            label: `${department.departmentName}`,
          }));
          setAllDepartment(options);
        })
        .catch((err) => console.log(err.response.data.message));
    } catch (err) {
      console.log(err.response.data.message);
    }
  }, [axiosPublic]);

  // Fetch doctors
  useEffect(() => {
    if(selectedClinic){
        
        try {
            axiosPublic
              .get(`/clinics/${selectedClinic?.value}/doctors`)
              .then((res) => {
                const options = res.data.data.map((doctor) => ({
                  value: doctor._id,
                  label: `${doctor.name}`,
                }));
                setAllDoctor(options);
              })
              .catch((err) => console.log(err.response.data.message));
          } catch (err) {
            console.log(err.response.data.message);
          }
    }
  }, [axiosPublic, selectedClinic]);

  // Formik for handling form data
  const formik = useFormik({
    initialValues: {
      patientName: "",
      department: "",
      phoneNumber: "",
      email: "",
      doctor: "",
      date: "",
      clinic:""
    },
    validate: (values) => {
      const errors = {};
      if (!values.patientName) errors.patientName = "Patient name is required";
      if (!values.phoneNumber) errors.phoneNumber = "Phone number is required";
      if (!values.department) errors.department = "Department is required";
      if (!values.doctor) errors.doctor = "Doctor is required";
      if (!values.date) errors.date = "Date is required";
      if (!values.clinic) errors.clinic = "clinic is required";
      return errors;
    },
    onSubmit: async ({
      patientName,
      department,
      email,
      phoneNumber,
      doctor,
      date, clinic
    }) => {
      phoneNumber = "+880" + phoneNumber;
      const info = {
        patientName,
        department,
        email,
        phoneNumber,
        doctor,
        date, clinic
      };
      console.log(info);
    },
  });

  return (
    <div className="p-6">
      <WebsiteTitle title="Book Appointment" />
      <Card className="border-none">
        <CardHeader className="text-center">
          <CustomTitle heading="Book Your Appointment" />
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">
              {/* Personal Details */}
              <h1 className="font-semibold text-xl mb-5">Personal Details:</h1>

              {/* Patient Name */}
              <div className="form-control mb-4 space-y-2">
                <label className="font-semibold" htmlFor="patientName">
                  Patient Name
                </label>
                <input
                  id="patientName"
                  name="patientName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patientName}
                  placeholder="Enter your name"
                  className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                />
                {formik.touched.patientName && formik.errors.patientName && (
                  <div className="text-red-500">
                    {formik.errors.patientName}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2">
                {/* phoneNumber */}
                <div className="form-control mb-4 space-y-3 ">
                  <label className="font-semibold" htmlFor="phoneNumber">
                    phoneNumber
                  </label>
                  <div
                    className={` flex bg-slate-200 items-center border rounded-md ${
                      formik.errors.phoneNumber && formik.touched.phoneNumber
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
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className="text-red-500">
                      {formik.errors.phoneNumber}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="form-control mb-4 space-y-2">
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

                {/* Select Clinic*/}
                <div className="form-control mb-4 space-y-2">
                  <label className="font-semibold" htmlFor="clinic">
                    clinic
                  </label>
                  <Select
                    id="clinic"
                    name="clinic"
                    onChange={(option) =>
                     { formik.setFieldValue("clinic", option); setSelectedClinic(option)

                        formik.setFieldValue("doctor", "")
                     } 
                      
                    }
                    value={formik.values.clinic}
                    options={allClinic}
                    styles={customStyles}
                  />
                  {formik.touched.clinic && formik.errors.clinic && (
                    <div className="text-red-500">
                      {formik.errors.clinic}
                    </div>
                  )}
                </div>
                {/* Select Department */}
                <div className="form-control mb-4 space-y-2">
                  <label className="font-semibold" htmlFor="department">
                    Department
                  </label>
                  <Select
                    id="department"
                    name="department"
                    onChange={(option) =>
                      formik.setFieldValue("department", option)
                    }
                    value={formik.values.department}
                    options={allDepartment}
                    styles={customStyles}
                  />
                  {formik.touched.department && formik.errors.department && (
                    <div className="text-red-500">
                      {formik.errors.department}
                    </div>
                  )}
                </div>

                {/* Select Doctor */}
                <div className="form-control mb-4 space-y-2">
                  <label className="font-semibold" htmlFor="doctor">
                    Doctor
                  </label>
                  <Select
                    id="doctor"
                    name="doctor"
                    onChange={(option) =>
                      formik.setFieldValue("doctor", option)
                    }
                    value={formik.values.doctor}
                    options={allDoctor}
                    styles={customStyles}
                  />
                  {formik.touched.doctor && formik.errors.doctor && (
                    <div className="text-red-500">{formik.errors.doctor}</div>
                  )}
                </div>

                {/* Date Picker */}
<div className="form-control relative mb-4 space-y-2 w-full">
  <label className="font-semibold">Select Appointment Date</label>
  <div className="flex items-center relative">
    <input
      type="text"
      value={
        selectedDate ? new Intl.DateTimeFormat('en-GB').format(selectedDate) : ''
      }
      placeholder="Select a date"
      readOnly
      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 focus:outline-blue-300 rounded-md"
    />
    <button
      type="button"
      onClick={() => setShowCalendar(!showCalendar)}
      className="absolute right-3 text-gray-500"
    >
      <FaCalendarAlt size={20} />
    </button>
  </div>
  {showCalendar && (
    <div className="absolute z-50 mt-2 bg-white shadow-lg rounded-md">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        inline
        className="bg-white rounded-md"
        calendarClassName="!w-[100%] !m-0 p-0"
      />
    </div>
  )}
</div>

              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <Button type="submit" className="w-full">
                  Book Appointment
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;
