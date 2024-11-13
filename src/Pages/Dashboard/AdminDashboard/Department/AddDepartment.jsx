import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";
import {  useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddDepartment = () => {
  const [err, setErr] = useState("");
  const axiosSecure = useAxiosSecure();


  const formik = useFormik({
    initialValues: {
      departmentName: "",
      departmentDescription: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.departmentName) {
        errors.departmentName = "Clinic name is required";
      }
      if (!values.departmentDescription)
    {
        errors.departmentDescription = "departmentDescription is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      
      const { departmentName, departmentDescription,} = values;

      const info = {
        departmentName,
       
        departmentDescription,
       
      };

    

try{
    axiosSecure.post('/departments', info)
    .then(res=>{if(res.data.data){
      setErr("")
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${info.departmentName} added successfully`,
        showConfirmButton: false,
        timer: 1500
      });
    }})
    .catch((err)=>setErr(err.response.data.errorSources[0].message    ))
   }catch(err){
    setErr(err=>setErr(err.response.data.message))
   }
    },
  });

  return (
    <div>
      <WebsiteTitle title="Add Department" />
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Add Department" />
          </CardHeader>
          <div>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid ">
                  {/* department name*/}
                
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="departmentName">
                      Department Name
                    </label>
                    <input
                      id="departmentName"
                      name="departmentName"
                      type="departmentName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.departmentName}
                      placeholder="Enter Department Name"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.departmentName && formik.errors.departmentName && (
                      <div className="text-red-500">{formik.errors.departmentName}</div>
                    )}
                  </div>

                  {/* departmentDescription */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="departmentDescription">
                      Department Description
                    </label>
                    <input
                      id="departmentDescription"
                      name="departmentDescription"
                      type="departmentDescription"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.departmentDescription}
                      placeholder="Enter  Description"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.departmentDescription && formik.errors.departmentDescription && (
                      <div className="text-red-500">{formik.errors.departmentDescription}</div>
                    )}
                  </div>

              
                </div>

                {err ? <p className="text-red-600">{err}</p>: ""}

                {/* Submit */}
                <div className="form-control mt-4">
                  <Button type="submit">Add Department</Button>
                </div>
              </form>
            </CardContent> 
          </div>
        </Card>
      </div>
    </div>
  );
};





export default AddDepartment;