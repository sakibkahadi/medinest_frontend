import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import Design from "../Shared/Design";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { uploadImage } from "@/lib/imageUpload";
import ImageUploader from "@/Pages/Dashboard/AdminDashboard/AddMedicine/ImageUploader";
import PatientImage from "./PatientImage";


const Register = () => {

  const {signIn} = useContext(AuthContext)
  
  const location = useLocation()
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false)



  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
     
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required";
      }
      

      if (!values.email) {
        errors.email = "Email is Required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is Required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      }

      return errors;
    },
    onSubmit: async ({ email, password, name,   }) => {
      
      const info = {email, password, name, }
      console.log(info)
      try{
axiosPublic.post('/users/create-patient', info)
.then(res=>{
  if(res.data.success){
    try{
      const userInfo = {email,password}
      axiosPublic.post('/users/signIn', userInfo)
      .then(res=>{
        const tokenData = res.data.token
        const userId = res.data.data._id
        console.log(userId)
        if(tokenData){
        localStorage.setItem('access-token', tokenData)
        localStorage.setItem('userId', userId)
        signIn(email,password, userId)
        .then(res=>{
          console.log(res)
          navigate(from, {replace:true})
        })
      }
    }
    
    ).catch(error=>setError(error.response.data.message))

    }catch(err){
      console.log(err)
    }
    
  }
}).catch(err=>setError(err.response.data.errorSources[0].message))
      }catch(err){
        setError
      }
    },
  });

  return (
    <>
      <WebsiteTitle title="Register"></WebsiteTitle>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* image part */}
        <Design />
        {/* registration part */}
        <div className="flex p-2 justify-center items-center ">
         {
          !loading ?  <Card className="border md:px-5 border-green-300 w-96 mb-10">
          <CardHeader className="text-center">
            <CustomTitle heading="Sign Up Med Nest"></CustomTitle>
          </CardHeader>
          <div>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                {/* full name */}
                <div className="form-control mb-4 space-y-3">
                  <label className="font-semibold" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Enter your name"
                    className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500">{formik.errors.name}</div>
                  )}
                </div>
                
                {/* email */}
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
                {/* password */}
                <div className="form-control mb-4 space-y-3">
                  <label className="font-semibold" htmlFor="password">
                    Password
                  </label>
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

                {/* Display error */}
                
                
                {
                  (error) && <div className="text-red-500 mb-4">{error}</div> 
                }
                

                <Button type="submit">Create Account</Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="mb-6 text-sm text-center w-full">
                Already registered go to
                <Link to="/login">
                  <span className="font-semibold   text-blue-500">
                    {" "}
                    SIGN IN
                  </span>
                </Link>
              </div>
            </CardFooter>
          </div>
        </Card> : <p>loading....</p>
         }
        </div>
      </div>
    </>
  );
};

export default Register;
