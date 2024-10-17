import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import 'react-phone-number-input/style.css';


import Swal from "sweetalert2";
import 'daisyui/dist/full.css';
import { Button } from "../../components/ui/button";

import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { customStyles } from "../Dashboard/AdminDashboard/AddDoctor/customStyle";
import { AuthContext } from "@/providers/AuthProvider";
import { LuBadgeAlert } from "react-icons/lu";
const RequestAnAmbulance = () => {
  const [startDate, setStartDate] = useState(null);
  const [error,SetError] = useState("");
  const {userData} = useContext(AuthContext)
  const [ambulanceTypes, setAmbulanceTypes] = useState([]);
  const axiosPublic = useAxiosPublic()
  useEffect(() => {
   
      axiosPublic.get('http://localhost:5000/api/ambulances')
      .then(res=>{
        
        const options = res.data.data.map(ambulance => ({
                value: ambulance._id,
                label: `${ambulance.title} - ${ambulance.title}`,
              }));
              setAmbulanceTypes(options);
      }).catch(err=>console.log(err))
  }, [axiosPublic]);

  const formik = useFormik({
    initialValues: {
      from: '',
      destination: '',
      ambulances: null,
      date: null,
      name: '',
      phoneNumber: ''
    },
    validate: (values) => {
      const errors = {};

      if (!values.from) errors.from = "Required";
      if (!values.destination) errors.destination = "Required";
      if (!values.ambulances) errors.ambulances = "Required";
      if (!values.date) errors.date = "Required";
      if (!values.name) errors.name = "Required";
      if (!values.phoneNumber) errors.phoneNumber = "Invalid phoneNumber number";

      return errors;
    },
    onSubmit: async (values) => {
       
      const schedule =format(values.date, "dd/MM/yyyy HH:mm")
      const patient =userData?._id
      const date= schedule.slice(0,10)
      const timeSlot = schedule.slice(11,16)
      const phoneNumber = '+880'+values.phoneNumber
      const info = {
        from:values.from,
        destination: values.destination,
        ambulance :values.ambulances.value,
        date: date, timeSlot:timeSlot,
        name:values.name,
        phoneNumber: phoneNumber,
        patient:patient
      };
// console.log(info)
      try{
        axiosPublic.post('/requestedAmbulances', info)
        .then(res=>{
          if(res.data.success){
            SetError("")
            console.log('requested')
          }
        }).catch(err=>SetError(err.response.data.errorSources[0].message))
      }catch(err){
        SetError(err)
      }
      // const res = await axios.post('http://localhost:5000/api//requestedAmbulance', formattedValues)
     
      // if(res.data.success){
      //   formik.resetForm();
      //   setStartDate(null);
      //   setPhoneNumber("");
      //   Swal.fire({
      //     position:"center",
      //     icon:"success",
      //     title: `Requested Successfully`,
      //     showConfirmButton:false,
      //     timer: 1500
      //   });
      // }
    },
  });

  return (
    <div className="max-w-lg mx-autolg:h-fit rounded-lg">
      <h1 className="text-white bg-blue-950 rounded-t-md text-xl font-bold p-2 text-center">
        Request an Ambulance
      </h1>
      <form className="card-body  lg:border lg:border-blue-300 " onSubmit={formik.handleSubmit}>

        {/* from */}
        <div className="form-control mb-4">
          <label className="mb-2" htmlFor="from">
            From
          </label>
          <input
            id="from"
            name="from" 
            type="text"
            onChange={formik.handleChange}
            value={formik.values.from}
            placeholder="Example- Dhaka"
            className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
          />
          {formik.errors.from && formik.touched.from && (
            <div className="text-red-500">Please enter a valid location</div>
          )}
        </div>

        {/* destination */}
        <div className="form-control mb-4">
          <label className="mb-2" htmlFor="destination">
            Destination
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.destination}
            placeholder="Example- Dhaka"
            className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
          />
          {formik.errors.destination && formik.touched.destination && (
            <div className="text-red-500">Please enter a valid location</div>
          )}
        </div>

        {/* Ambulance Types */}
        <div className="form-control mb-4">
          <label className="mb-2" htmlFor="ambulances">
            Ambulance Type
          </label>
          <Select
            id="ambulances"
            name="ambulances"
            onChange={(selectedOption) => formik.setFieldValue("ambulances", selectedOption)}
            value={formik.values.ambulances}
            options={ambulanceTypes}
            styles={customStyles}
          />
          {formik.errors.ambulances && formik.touched.ambulances && (
            <div className="text-red-500">Ambulance Type is required</div>
          )}
        </div>

        {/* Date and time */}
        <div className="form-control mb-4">
          <label className="mb-2" htmlFor="date">
            Date and Time
          </label>
          <div className="relative w-full flex flex-col">
            <ReactDatePicker
              name="date"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                formik.setFieldValue("date", date);
              }}
              dateFormat="dd/MM/yyyy h:mm aa"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              minDate={new Date()}
              filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
              className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
            />
            <FaCalendarAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {formik.errors.date && formik.touched.date && (
            <div className="text-red-500">Date is required</div>
          )}
        </div>

        {/* Name */}
        <div className="form-control mb-4">
          <label className="mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Your Name"
            className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500">Your Name is required</div>
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

        <Button type="submit" >
          Send Ambulance Request
        </Button>
        <div className=" mt-5 flex gap-3 items-center
        "> <LuBadgeAlert className="h-[30px] w-[30px]" /><p>One of our agents will get back to you within 30 minutes with the update of the ambulance</p></div>
        
      </form>
      {
        error && <div className="text-red-700">{error}</div>
      }
     
    </div>
  );
};

export default RequestAnAmbulance;
