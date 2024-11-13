/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import ImageUploader from "./ImageUploader";
import { uploadImage } from "@/lib/imageUpload";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { customStyles } from "../AddDoctor/customStyle";
import Select from "react-select";
import { ampouleOptions, mgOptions, mlOptions, productTypesOptions } from "@/lib/Medicine";
import { CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Swal from "sweetalert2";



const UpdateMedicine = ({ medicine, onClose, refetch }) => {
  const [imageUrl, setImageUrl] = useState(medicine?.productImage); // Store the image URL

  const handleImageUpload = async (file) => {
    const newImageUrl = await uploadImage(file); // Call the upload function
    if (newImageUrl) {
      setImageUrl(newImageUrl); // Update the state with the new image URL
    }
    return newImageUrl;
  };
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false)
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [productCompany, setProductCompany] = useState([]);
  const [genericName, setGenericName] = useState([]);
  const [filteredPowerOptions, setFilteredPowerOptions] = useState([]);
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
            setProductCompany(options);
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

      const formik = useFormik({
        initialValues: {
            productName: medicine.productName || "",
            productImage: imageUrl || null,
          productCompany: medicine?.productCompany
            ? { value: medicine.productCompany._id, label: medicine.productCompany.companyName }
            : null,
            genericName: medicine?.genericName
            ? { value: medicine.genericName._id, label: medicine.genericName.genericName }
            : null, 

            productTypes: medicine?.productType
            ? { value: medicine.productType, label: medicine.productType }
            : null, 


            productPowers: medicine?.productPower
            ? { value: medicine.productPower, label: medicine.productPower }
            : null, 




            shortDescription: medicine.shortDescription || "",
            longDescription: medicine.longDescription || "",
            stripSize: medicine.stripSize || "",
            unitPrice: medicine.unitPrice || "",
            quantity: medicine.quantity || 0
        },
        
        onSubmit: async (values) => {
          const {
            productName,
            productCompany,
            genericName,
            productPowers,
            productTypes,
            shortDescription,
            longDescription,
            stripSize,
            unitPrice, quantity
          } = values;
  
          // Upload image if available
          
    
          // Prepare the data for submission
      
          const info = {
            productName,
            productImage: imageUrl,
            productCompany: productCompany.value,
            genericName: genericName.value,
            productType: productTypes.value,
            productPower: productPowers.value,
            shortDescription,longDescription,  stripSize,unitPrice, quantity:Number(quantity)
          };
    
          
    
          // Submit the data
          try{
            axiosSecure.patch(`/medicines/${medicine?._id}`, info)
            .then(res=>{if(res.data.data){
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Medicine updated successfully",
                showConfirmButton: false,
                timer: 1500
              });
              refetch()
              setErr("")
              console.log('added')
            }})
            .catch((err)=>{
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${err.response.data.message}`,
                showConfirmButton: false,
                timer: 1500
              });
            })
           }catch(err){
            setErr(err=>setErr(err.response.data.message))
           }
        },
      });
      useEffect(() => {
        if (formik.values.productTypes?.value) {
          updatePowerOptions(formik.values.productTypes.value);
        }
      }, [formik.values.productTypes?.value]);
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
    <div className="modal-box relative ">
      <div className="text-center">
        <CustomTitle heading={`${medicine?.productName}`} />
      </div>
      <div className=" flex gap-2  items-center ">
        {/* image upload */}
      <div className=" ">
      <ImageUploader
          initialImage={imageUrl} // Pass the updated image URL
          onUpload={handleImageUpload} // Pass the upload function
        />
      </div>
      {/* Details */}
      <div className="py-4  flex-grow">
       
      <div>
            {
                !loading? <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <div className="">
                    {/* Product Name */}
                    <div className="form-control ">
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
  
                   
  
                    {/* company */}
<div className="form-control ">
  <label className="font-semibold" htmlFor="productCompany">
    Company
  </label>
  <Select
    id="productCompany"
    name="productCompany"
    onChange={(option) => formik.setFieldValue("productCompany", option)}
    value={formik.values.productCompany} // Set the default value here
    options={Array.isArray(productCompany) ? productCompany : []}
    styles={customStyles}
  />
  {formik.touched.productCompany && formik.errors.productCompany && (
    <div className="text-red-500">{formik.errors.productCompany}</div>
  )}
</div>

                    {/* generic name */}
  
                    <div className="form-control ">
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
  
                    <div className="form-control ">
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
                    <div className="form-control ">
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
  
                    <div className="form-control  ">
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
  
                    <div className="form-control  col-span-2 ">
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
    <div className="form-control ">
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
                  {err || ""}
  
                  {/* Submit */}
                  <div className="form-control mt-4">
                    <Button type="submit">Update Medicine</Button>
                  </div>
                </form>
              </CardContent> : <div>loading .....</div>
            }
          </div>
      </div>


      </div>

      {/* modal */}
      <div className="modal-action">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose} // Close the modal
          >
            ✕
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedicine;
