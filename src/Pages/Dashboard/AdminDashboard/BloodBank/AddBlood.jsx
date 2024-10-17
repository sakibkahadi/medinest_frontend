import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { customStyles } from "../AddDoctor/customStyle";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const AddBlood = () => {
  const [err, setErr] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clinic, setClinic] = useState([])
const axiosPublic = useAxiosPublic()
  const options = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

   //fetch clinicData
   useEffect(() => {
    axiosPublic
      .get(`/clinics/${localStorage.getItem("userId")}/admins`)
      .then((res) => setClinic(res.data.data._id))
      .catch((err) => setErr(err.response.data));
  }, [axiosPublic]);
 
  const formik = useFormik({
    initialValues: {
      bloodGroup: "",
      quantity: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.bloodGroup) {
        errors.bloodGroup = "Blood Group is required";
      }
      if (!values.quantity) {
        errors.quantity = "Quantity is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const { bloodGroup, quantity } = values;

      const info = {
        clinicName:clinic,
        bloodGroup: bloodGroup.value, // Adjusted to extract the value from the selected option
        quantity,
      };

      // Uncomment and complete this block for API interaction
      try {
        axiosSecure
          .post("/bloodBank/create-bloodBank", info)
          .then((res) => {
            if (res.data.data) {
              setErr("");
              console.log('created blood');
            }
          })
          .catch((err) => setErr(err.response.data.errorSources[0].message));
      } catch (err) {
        setErr((err) => setErr(err.response.data.message));
      }
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
      <WebsiteTitle title="Add Blood" />
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Add Blood to Blood Bank" />
          </CardHeader>
          <div>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid">
                  {/* Blood Group */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="bloodGroup">
                      Select Blood Group
                    </label>
                    <Select
                      id="bloodGroup"
                      name="bloodGroup"
                      options={options}
                      onChange={(option) =>
                        formik.setFieldValue("bloodGroup", option)
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.bloodGroup}
                      placeholder="Select Blood Group"
                      styles={customStyles}
                      classNamePrefix="select"
                    />
                    {formik.touched.bloodGroup &&
                      formik.errors.bloodGroup && (
                        <div className="text-red-500">
                          {formik.errors.bloodGroup}
                        </div>
                      )}
                  </div>

                  {/* Quantity */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="quantity">
                      Enter Quantity
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      onChange={handleNumericInput}
                      onBlur={formik.handleBlur}
                      value={formik.values.quantity}
                      placeholder="Enter Quantity"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className="text-red-500">{formik.errors.quantity}</div>
                    )}
                  </div>
                </div>

                {err && <p className="text-red-600">{err}</p>}

                {/* Submit */}
                <div className="form-control mt-4">
                  <Button type="submit">Add Blood</Button>
                </div>
              </form>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddBlood;
