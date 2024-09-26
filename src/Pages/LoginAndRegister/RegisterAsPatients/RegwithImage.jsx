import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import Design from "../Shared/Design";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const RegwithImage = () => {
  const { createUser } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState("");

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
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      } else if (values.password.length > 8) {
        errors.password = "Password cannot be more than 8 characters long";
      }

      return errors;
    },
    onSubmit: async ({ name, email, password }) => {
      console.log(email, name, password);
      createUser(email, password)
        .then((result) => {
          const loggedUser = result.user;
          console.log(loggedUser);
          // handle image upload logic here if needed
        });
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        setImageError("Only image files are allowed");
        return;
      }
     
      setSelectedImage(URL.createObjectURL(file));
      setImageError("");
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageError("");
  };

  return (
    <>
      <WebsiteTitle title="Register" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Design />
        <div className="flex p-2 justify-center items-center ">
          <Card className="border md:px-5 border-green-300 w-96 mb-10">
            <CardHeader className="text-center">
              <CustomTitle heading="Sign Up Med Nest" />
            </CardHeader>
            <div>
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
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
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="image">
                      Profile Image
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                      onBlur={formik.handleBlur}
                      accept="image/*"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {selectedImage && (
                      <div className="flex items-center space-x-4 mt-2">
                        <img
                          src={selectedImage}
                          alt="Selected profile"
                          className="w-20 h-20 object-cover rounded-full"
                        />
                        <Button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-500"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    {imageError && (
                      <div className="text-red-500">{imageError}</div>
                    )}
                  </div>
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
                      <div className="text-red-500">{formik.errors.password}</div>
                    )}
                  </div>
                  <Button type="submit">Create Account</Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="mb-6 text-sm text-center w-full">
                  Already registered go to
                  <Link to="/login">
                    <span className="font-semibold text-blue-500"> SIGN IN</span>
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

export default RegwithImage;
