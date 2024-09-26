import { useFormik } from "formik";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { LuBadgeAlert } from "react-icons/lu";
import axios from "axios";
import Swal from "sweetalert2";
import 'daisyui/dist/full.css';
import { Button } from "../../components/ui/button";

import useAxiosPublic from "@/Hooks/useAxiosPublic";
const RequestAnAmbulance = () => {
  const [startDate, setStartDate] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
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
      phone: ''
    },
    validate: (values) => {
      const errors = {};

      if (!values.from) errors.from = "Required";
      if (!values.destination) errors.destination = "Required";
      if (!values.ambulances) errors.ambulances = "Required";
      if (!values.date) errors.date = "Required";
      if (!values.name) errors.name = "Required";
      if (!values.phone || !isValidPhoneNumber(values.phone)) errors.phone = "Invalid phone number";

      return errors;
    },
    onSubmit: async (values) => {
      const formattedValues = {
        from:values.from,
        destination: values.destination,
        ambulance :values.ambulances.value,
        date: values.date ? format(values.date, "dd/MM/yyyy HH:mm") : null,
        name:values.name,
        number: values.phone
      };

      const res = await axios.post('http://localhost:5000/api//requestedAmbulance', formattedValues)
     
      if(res.data.success){
        formik.resetForm();
        setStartDate(null);
        setPhoneNumber("");
        Swal.fire({
          position:"center",
          icon:"success",
          title: `Requested Successfully`,
          showConfirmButton:false,
          timer: 1500
        });
      }
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
            className="w-full p-2 border border-gray-300 rounded-md"
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
            className="w-full p-2 border border-gray-300 rounded-md"
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
            className="w-full"
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
              className="w-full p-2 pr-10 border border-gray-300 rounded-md"
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
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500">Your Name is required</div>
          )}
        </div>

        {/* Phone number */}
        <div className="form-control mb-4">
          <label className="mb-2" htmlFor="phone">
            Phone Number
          </label>
          <PhoneInput
            id="phone"
            name="phone"
            international
            countryCallingCodeEditable={false}
            defaultCountry="BD"
            value={phoneNumber}
            onChange={(value) => {
              setPhoneNumber(value);
              formik.setFieldValue("phone", value);
            }}
            className="w-full p-2 border border-gray-300 rounded-md  !outline-none !focus:ring-0"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-500">Invalid phone number</div>
          )}
        </div>

        <Button type="submit" >
          Send Ambulance Request
        </Button>
        <div className=" mt-5 flex gap-3 items-center
        "> <LuBadgeAlert className="h-[30px] w-[30px]" /><p>One of our agents will get back to you within 30 minutes with the update of the ambulance</p></div>
        
      </form>
     
    </div>
  );
};

export default RequestAnAmbulance;
