import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "../AddDoctor/customStyle";
import { ampouleOptions, mgOptions, mlOptions, productTypesOptions } from "@/lib/Medicine";
import { uploadImage } from "@/lib/imageUpload";
import Swal from "sweetalert2";



const AddMedicine = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false)
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [company, setCompany] = useState([]);
  const [genericName, setGenericName] = useState([]);
  const [filteredPowerOptions, setFilteredPowerOptions] = useState([]);
 
const adminId = localStorage.getItem('userId')


  // Fetch companies for the select options
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosPublic.get("/companies");
        const options = Array.isArray(response.data.data)
          ? response.data.data.map((company) => ({
              value: company._id,
              label: company.companyName, // Use a more user-friendly label if available
            }))
          : [];
        setCompany(options);
      } catch (err) {
        console.error(
          "Error fetching companies:",
          err.response?.data?.message || err
        );
      }
    };
    fetchCompanies();
  }, [axiosPublic]);
  // Fetch generic name for the select options
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosPublic.get("/genericName");
        const options = Array.isArray(response.data.data)
          ? response.data.data.map((genericName) => ({
              value: genericName._id,
              label: genericName.genericName, // Use a more user-friendly label if available
            }))
          : [];
        setGenericName(options);
      } catch (err) {
        console.error(
          "Error fetching companies:",
          err.response?.data?.message || err
        );
      }
    };
    fetchCompanies();
  }, [axiosPublic]);

  //   product types Select Options
  

  const updatePowerOptions = (productType) => {
    if (productType === "syrup" || productType === "suspension") {
      setFilteredPowerOptions(mlOptions);
    } else if (productType === "injection") {
      setFilteredPowerOptions(ampouleOptions);
    } else {
      setFilteredPowerOptions(mgOptions);
    }
  };

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      productName: "",
      productImage: null,
      companyName: [],
      genericName: [],
      productTypes: [],
      productPowers: [],
      shortDescription: "",
      longDescription: "",
      stripSize: "",
      unitPrice: "",
      quantity: 0
    },
    validate: (values) => {
      const errors = {};
      if (!values.productName) {
        errors.productName = "Product name is required";
      }
      if (!values.productImage) {
        errors.productImage = "Product Image is required";
      }
      if (!values.companyName) {
        errors.companyName = "Company name is required";
      }
      if (!values.genericName) {
        errors.genericName = "Generic name is required";
      }
      if (!values.productPowers) {
        errors.productPowers = "Generic name is required";
      }
      if (!values.shortDescription) {
        errors.shortDescription = "small details is required";
      }
      
      if (!values.longDescription) {
        errors.longDescription = "give full  details";
      }
      if (!values.stripSize) {
        errors.stripSize = "Strip size is required";
      } else if (isNaN(values.stripSize)) {
        errors.stripSize = "Strip size must be a number";
      }

      // Validation for unitPrice
      if (!values.unitPrice) {
        errors.unitPrice = "Unit price is required";
      } else if (isNaN(values.unitPrice)) {
        errors.unitPrice = "Unit price must be a number";
      }
      
      // Validation for quantity
      if (!values.quantity) {
        errors.quantity = "Quantity is required";
      } else if (isNaN(values.quantity)) {
        errors.quantity = "Quantity must be a number";
      }

      
      return errors;
    },
    onSubmit: async (values) => {
      const {
        productName,
        productImage,
        companyName,
        genericName,
        productPowers,
        productTypes,
        shortDescription,
        longDescription,
        stripSize,
        unitPrice, quantity
      } = values;


      // Upload image if available
      let imageUrl = null;
    
      if (productImage) {
        setLoading(true)
        imageUrl = await uploadImage(productImage);
       setLoading(false)
        if (!imageUrl) {
          setErr("Image upload failed");
          return;
        }
      }

      // Prepare the data for submission
      const info = {
        admin:adminId,
        productName,
        productImage: imageUrl,
        productCompany: companyName.value,
        genericName: genericName.value,
        productType: productTypes.value,
        productPower: productPowers.value,
        shortDescription,longDescription,  stripSize,unitPrice, quantity:Number(quantity)
      };

      console.log(info);

      // Submit the data
      try{
        axiosSecure.post('/medicines/create-medicine', info)
        .then(res=>{if(res.data.data){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Medicine Created Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          setErr("")
        }})
        .catch((err)=>{setErr(err.response.data.errorSources[0].message   );
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${err.response.data.errorSources[0].message  }`,
            showConfirmButton: false,
            timer: 1500
          });
        })
       }catch(err){
        setErr(err=>setErr(err.response.data.message))
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
      <WebsiteTitle title="Add Medicine" />
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Medicine Info" />
          </CardHeader>
          <div>
            {
                !loading? <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Product Name */}
                    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="productName">
                        Product Name
                      </label>
                      <input
                        id="productName"
                        name="productName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.productName}
                        placeholder="Enter Product Name"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.productName &&
                        formik.errors.productName && (
                          <div className="text-red-500">
                            {formik.errors.productName}
                          </div>
                        )}
                    </div>
  
                    {/* Image Upload */}
                    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="productImage">
                        Image
                      </label>
                      <input
                        id="productImage"
                        name="productImage"
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "productImage",
                            event.currentTarget.files[0]
                          )
                        }
                        className="file-input file-input-bordered file-input-primary w-full"
                      />
                    </div>
  
                    {/* company */}
  
                    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="companyName">
                        Company
                      </label>
                      <Select
                        id="companyName"
                        name="companyName"
                        onChange={(option) =>
                          formik.setFieldValue("companyName", option)
                        }
                        value={formik.values.companyName}
                        options={Array.isArray(company) ? company : []}
                        styles={customStyles}
                      />
                      {formik.touched.companyName &&
                        formik.errors.companyName && (
                          <div className="text-red-500">
                            {formik.errors.companyName}
                          </div>
                        )}
                    </div>
                    {/* generic name */}
  
                    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="genericName">
                        Generic
                      </label>
                      <Select
                        id="genericName"
                        name="genericName"
                        onChange={(option) =>
                          formik.setFieldValue("genericName", option)
                        }
                        value={formik.values.genericName}
                        options={Array.isArray(genericName) ? genericName : []}
                        styles={customStyles}
                      />
                      {formik.touched.genericName &&
                        formik.errors.genericName && (
                          <div className="text-red-500">
                            {formik.errors.genericName}
                          </div>
                        )}
                    </div>
                    {/* Product Types */}
  
                    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="productTypes">
                        Type
                      </label>
                      <Select
                        id="productTypes"
                        name="productTypes"
                        onChange={(option) => {
                          formik.setFieldValue("productTypes", option);
                          updatePowerOptions(option.value);
                        }}
                        value={formik.values.productTypes}
                        options={productTypesOptions}
                        styles={customStyles}
                      />
                      {formik.touched.productTypes &&
                        formik.errors.productTypes && (
                          <div className="text-red-500">
                            {formik.errors.productTypes}
                          </div>
                        )}
                    </div>
  
                    {/* product power */}
                    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="productPowers">
                        Power
                      </label>
                      <Select
                        id="productPowers"
                        name="productPowers"
                        onChange={(option) =>
                          formik.setFieldValue("productPowers", option)
                        }
                        value={formik.values.productPowers}
                        options={filteredPowerOptions}
                        styles={customStyles}
                      />
                      {formik.touched.productPowers &&
                        formik.errors.productPowers && (
                          <div className="text-red-500">
                            {formik.errors.productPowers}
                          </div>
                        )}
                    </div>
                    {/* short Description */}
  
                    <div className="form-control mb-4 space-y-4 md:col-span-2 ">
                      <label className="font-semibold" htmlFor="shortDescription">
                        Small details
                      </label>
                      <textarea
                        id="shortDescription"
                        name="shortDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.shortDescription}
                        placeholder="Enter Product Name"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
  
                      {formik.touched.shortDescription &&
                        formik.errors.shortDescription && (
                          <div className="text-red-500">
                            {formik.errors.shortDescription}
                          </div>
                        )}
                    </div>
                    {/* long Description */}
  
                    <div className="form-control mb-4 space-y-4 md:col-span-2 ">
                      <label className="font-semibold" htmlFor="longDescription">
                        long description
                      </label>
                      <textarea
                        id="longDescription"
                        name="longDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.longDescription}
                        placeholder="Enter Product Name"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
  
                      {formik.touched.longDescription &&
                        formik.errors.longDescription && (
                          <div className="text-red-500">
                            {formik.errors.longDescription}
                          </div>
                        )}
                    </div>
  
    {/* Stripe Size */}
    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="stripSize">
                       Stripe Size
                      </label>
                      <input
                        id="stripSize"
                        name="stripSize"
                        type="text" 
                        onChange={handleNumericInput}
                        onBlur={formik.handleBlur}
                        value={formik.values.stripSize}
                        placeholder="Enter strip size"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.stripSize &&
                        formik.errors.stripSize && (
                          <div className="text-red-500">
                            {formik.errors.stripSize}
                          </div>
                        )}
                    </div>
    {/* unit Price */}
    <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="unitPrice">
                       Unit Price
                      </label>
                      <input
                        id="unitPrice"
                        name="unitPrice"
                        type="text" 
                        onChange={handleNumericInput}
                        onBlur={formik.handleBlur}
                        value={formik.values.unitPrice}
                        placeholder="Enter unitPrice"
                        className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                      />
                      {formik.touched.unitPrice &&
                        formik.errors.unitPrice && (
                          <div className="text-red-500">
                            {formik.errors.unitPrice}
                          </div>
                        )}
                    </div>
  {/* quantity */}
  <div className="form-control mb-4 space-y-4">
                      <label className="font-semibold" htmlFor="quantity">
                       Quantity
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
                      {formik.touched.quantity &&
                        formik.errors.quantity && (
                          <div className="text-red-500">
                            {formik.errors.quantity}
                          </div>
                        )}
                    </div>
                  </div>
  
                  {err && <p className="text-red-600">{err}</p>}
                 
  
                  {/* Submit */}
                  <div className="form-control mt-4">
                    <Button type="submit">Add Medicine</Button>
                  </div>
                </form>
              </CardContent> : <div>loading .....</div>
            }
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddMedicine;
