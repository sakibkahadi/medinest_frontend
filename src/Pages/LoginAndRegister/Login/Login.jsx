import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import { Link, useLocation, useNavigate } from "react-router-dom";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";

import Design from "../Shared/Design";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import {  useFormik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";

import Swal from "sweetalert2";

const Login = () => {
  
const [serverError, setServerError] = useState("")
  const {signIn, error} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email is Required";
      }

      if (!values.password) {
        errors.password = "Password is Required";
      }

      return errors;
    },
    onSubmit: async ({email, password}) => {
      signIn(email,password,  )
      .then(res=>{
        if(res){
       
          navigate(from, {replace:true})
        }
      
        
      }).catch(err=>Swal.fire({
        position: "center",
        icon: "error",
        title: `Invalid email or password`,
        showConfirmButton: false,
        timer: 1500
      }))
    
      
    },
  });

  return (
    <>
      <WebsiteTitle title="Sign in"></WebsiteTitle>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* image part */}
        <Design />
        {/* registration part */}
        <div className="flex p-2 justify-center items-center ">
          <Card className="border md:px-5 border-green-300 w-96 mb-10">
            <CardHeader className="text-center">
              <CustomTitle heading="Sign in to Med Nest"></CustomTitle>
            </CardHeader>
            <div>
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
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
                      <div className="text-red-500">{formik.errors.email}</div>
                    )}
                  </div>
                  {/* password */}
                  <div className="form-control mb-4 space-y-3 ">
                    <div className=" flex justify-between items-center">
                    <label className="font-semibold" htmlFor="password">
                      Password
                    </label>
                    <Link to="/forgotPassword">
                    <span className="font-semibold text-sm  text-blue-500">
                      {" "}
                      forgot password?
                    </span>
                  </Link>
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Enter your password"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-red-500">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  {
                    serverError || error && <div className="text-red-500 mb-4">{error}</div>
                  }

                  <Button type="submit">Log in</Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="mb-6 text-sm text-center w-full">
                  Please register at first. Go to
                  <Link to="/register">
                    <span className="font-semibold   text-blue-500">
                      {" "}
                      SIGN UP
                    </span>
                  </Link>
                </div>
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
