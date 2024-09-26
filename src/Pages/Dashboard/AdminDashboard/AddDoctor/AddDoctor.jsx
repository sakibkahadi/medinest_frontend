import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Select from "react-select";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";
import { customStyles } from "./customStyle";

const AddDoctor = () => {
  const options = [
    { value: "cardiology", label: "Cardiology" },
    { value: "dermatology", label: "Dermatology" },
    { value: "neurology", label: "Neurology" },
    { value: "endocrinology", label: "Endocrinology" },
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      website: "",
      address: "",
      specialization: "",
      experience: "",
      feesPerConsultation:0,
      startTime: '',
      endTime:''
    },
    validate: (values) => {
      const errors = {};

      if (!values.firstName) {
        errors.firstName = "first name is Required";
      }
      if (!values.lastName) {
        errors.lastName = "middle name is Required";
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = "phone Number is Required";
      } else if (!/^[0-9]{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber = "Enter valid phone number";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }

      if (!values.address) {
        errors.address = "address is required";
      }
      if (!values.specialization) {
        errors.specialization = "specialization is required";
      }
      if (!values.experience) {
        errors.experience = "experience is required";
      }
      if (!values.feesPerConsultation) {
        errors.feesPerConsultation = "feesPerConsultation is required";
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
      firstName,
      lastName,
      phoneNumber,
      email,
      website,
      address,
      specialization,
      experience, feesPerConsultation, startTime, endTime
    }) => {
      const info = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        website: website,
        address: address,
        specialization: specialization.value,
        experience: experience, feesPerConsultation: feesPerConsultation
        ,timing: {
          startTime:startTime, endTime:endTime
        }
      };
      console.log(info);
    },
  });
  return (
    <div>
      <WebsiteTitle title="Add Doctor"></WebsiteTitle>
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Sign in to Med Nest"></CustomTitle>
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

                    {/* firstName */}
                    <div className="form-control mb-4 space-y-3 ">
                      <label className="font-semibold" htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        placeholder="Enter your firstName"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <div className="text-red-500">
                          {formik.errors.firstName}
                        </div>
                      )}
                    </div>
                    {/* lastName */}
                    <div className="form-control mb-4 space-y-3 ">
                      <label className="font-semibold" htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        placeholder="Enter your lastName"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <div className="text-red-500">
                          {formik.errors.lastName}
                        </div>
                      )}
                    </div>
                    {/* phoneNumber */}
                    <div className="form-control mb-4 space-y-3 ">
                      <label className="font-semibold" htmlFor="phoneNumber">
                        phoneNumber
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

                    {/* second row */}

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
                      <label className="font-semibold" htmlFor="email">
                        Website (Optional)
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.website}
                        placeholder="Enter your website"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                    </div>
                    {/* address */}
                    <div className="form-control mb-4 space-y-3 ">
                      <label className="font-semibold" htmlFor="address">
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        placeholder="Enter your address"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.address && formik.errors.address && (
                        <div className="text-red-500">
                          {formik.errors.address}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* professional Details */}
                <div className="">
                  <h1 className="font-semibold text-xl mb-5">
                    Professional Details :{" "}
                  </h1>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2">
                    {/* 1st row */}

                    {/* specialization */}
                    <div className="form-control mb-4 space-y-3 ">
                      <label className="font-semibold" htmlFor="specialization">
                        Specialization
                      </label>
                      <Select
                        id="specialization"
                        name="specialization"
                        onChange={(option) =>
                          formik.setFieldValue("specialization", option)
                        }
                        value={formik.values.specialization}
                        options={options}
                        className="full    "
                        styles={customStyles}
                      />
                      {formik.touched.specialization &&
                        formik.errors.specialization && (
                          <div className="text-red-500">
                            {formik.errors.specialization}
                          </div>
                        )}
                    </div>

                    {/* experience */}

                    <div className="form-control mb-4 space-y-3 ">
                      <label className="font-semibold" htmlFor="experience">
                        Experience
                      </label>
                      <input
                        id="experience"
                        name="experience"
                        type="number"
                        min={1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.experience}
                        placeholder="Enter your experience year"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.experience &&
                        formik.errors.experience && (
                          <div className="text-red-500">
                            {formik.errors.experience}
                          </div>
                        )}
                    </div>


{/*  fees per consultation */}
<div className="form-control mb-4 space-y-3">
  <label className="font-semibold" htmlFor="feesPerConsultation">
    Fees Per Consultation
  </label>
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
    <input
      id="feesPerConsultation"
      name="feesPerConsultation"
      type="number"
      min={1}
      step="1"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.feesPerConsultation}
      placeholder="0.00"
      className="w-full pl-7 text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300 appearance-none"
    />
  </div>
  {formik.touched.feesPerConsultation && formik.errors.feesPerConsultation && (
    <div className="text-red-500">
      {formik.errors.feesPerConsultation}
    </div>
  )}
</div>
                    {/* second row */}


                    <div className="form-control mb-4 space-y-3">
        <label className="font-semibold" htmlFor="startTime">
          Start Time
        </label>
        <input
          id="startTime"
          name="startTime"
          type="time"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.startTime}
          className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
        />
        {formik.touched.startTime && formik.errors.startTime && (
          <div className="text-red-500">{formik.errors.startTime}</div>
        )}
      </div>

      <div className="form-control mb-4 space-y-3">
        <label className="font-semibold" htmlFor="endTime">
          End Time
        </label>
        <input
          id="endTime"
          name="endTime"
          type="time"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.endTime}
          className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
        />
        {formik.touched.endTime && formik.errors.endTime && (
          <div className="text-red-500">{formik.errors.endTime}</div>
        )}
      </div>


                  </div>
                </div>

                <Button type="submit">Log in</Button>
              </form>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddDoctor;
