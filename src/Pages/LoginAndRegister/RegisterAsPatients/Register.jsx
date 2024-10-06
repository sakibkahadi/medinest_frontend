import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import Design from "../Shared/Design";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios, { AxiosError } from "axios";

const Register = () => {
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const [firebaseError, setFirebaseError] = useState("");
  const [serverError, setServerError] = useState("")
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      photoURl: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.photoURl) {
        errors.photoURl = "photoURl is required";
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
      } else if (values.password.length > 8) {
        errors.password = "Password can not be more than 8 characters long";
      }

      return errors;
    },
    onSubmit: async ({ email, password, name, photoURl: image }) => {
      createUser(email, password)
        .then(() => {
          updateUserProfile(name, image)
            .then(() => {
              const userInfo = { name, email, password, image };
              console.log(userInfo);
              axios
                .post("http://localhost:5000/api/users/create-patient", userInfo)
                .then((res) => {
                 console.log(res)
                  
                  setFirebaseError("");
                  logOut()
                  navigate('/login')
                }).catch(error=>{
                  
                  setServerError(error.response.data.message)
                  
                })
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => {
          console.log(error )
          if (error.code === "auth/email-already-in-use") {
            setFirebaseError(
              "This email is already in use. Please use a different email."
            );
          } else {
            setFirebaseError("An unexpected error occurred. Please try again.");
          }
        });
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
          <Card className="border md:px-5 border-green-300 w-96 mb-10">
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
                  {/* photo url */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="photoURl">
                      photoURl
                    </label>
                    <input
                      id="photoURl"
                      name="photoURl"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.photoURl}
                      placeholder="Enter your name"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.photoURl && formik.errors.photoURl && (
                      <div className="text-red-500">
                        {formik.errors.photoURl}
                      </div>
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

                  {/* Display Firebase error */}
                  
                  
                  {
                    (serverError || firebaseError) && <div className="text-red-500 mb-4">{firebaseError}</div> 
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
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
