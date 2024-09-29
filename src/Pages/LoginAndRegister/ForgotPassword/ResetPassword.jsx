import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent,  CardHeader } from "@/components/ui/card";

import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { AuthContext } from "@/providers/AuthProvider";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



const ResetPassword = ({email}) => {
 
    const [error, setError] = useState("");
    const axiosPublic = useAxiosPublic()
 const {signIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
      const formik = useFormik({
        initialValues: {
          newPassword: "",
          reEnterPassword: "",
        },
        validate: (values) => {
          const errors = {};
    
          if (!values.newPassword) {
            errors.newPassword = "newPassword is Required";
          }
    
          if (!values.reEnterPassword) {
            errors.reEnterPassword = "Password is Required";
          }
    
          return errors;
        },
        onSubmit: async ({newPassword, reEnterPassword}) => {
         
          try{
            
            axiosPublic.post('/users/reset-password', {email,newPassword, reEnterPassword})
            .then(res=>{
                if(res.data.success){
                    signIn(email,newPassword)
                    .then(res=>{
                      console.log(res)
                      navigate(from, {replace:true})
                    })
                }
            })
            .catch(error=>setError(error.response.data.message))
            
          }catch(err){
            setError(err)
          }
          
        },
      });
    return (
        <div className="flex p-2 justify-center items-center ">
        <Card className="border md:px-5 border-green-300 w-full mb-10">
          <CardHeader className="text-center">
            <CustomTitle heading="Your password must be 6 character long"></CustomTitle>
          </CardHeader>
          <div>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                {/* new password */}
                <div className="form-control mb-4 space-y-3 ">
                  <label className="font-semibold" htmlFor="newPassword">
                    Set a new Password
                  </label>
                  <input
                      id="newPassword"
                      name="newPassword"
                      type="newPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                      placeholder="Enter new Password"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <div className="text-red-500">{formik.errors.newPassword}</div>
                  )}
                </div>
                {/* re-enter new password */}
                <div className="form-control mb-4 space-y-3 ">
                  
                  <label className="font-semibold" htmlFor="reEnterPassword">
                   Confirm new Password
                  </label>
                 
                
                  <input
                      id="reEnterPassword"
                      name="reEnterPassword"
                      type="reEnterPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.reEnterPassword}
                      placeholder="Enter your reEnterPassword"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                  {formik.touched.reEnterPassword && formik.errors.reEnterPassword && (
                    <div className="text-red-500">
                      {formik.errors.reEnterPassword}
                    </div>
                  )}
                </div>
              {
                error && <div className="text-red-600 font-bold">{error}</div>
              }

                <Button type="submit">Reset Password</Button>
              </form>
            </CardContent>
       
          </div>
        </Card>
      </div>
    );
};

export default ResetPassword;