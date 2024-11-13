import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import NoData from "@/customComponents/iconComponents/NoData";
import WebsiteTitle from "@/customComponents/iconComponents/WebsiteTitle";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const AddCompany = () => {
  const [err, setErr] = useState("");
  const [getErr, setGetErr] = useState("");
  const axiosSecure = useAxiosSecure();
  const [productCompany, setProductCompany] = useState([]);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [editingCompanyName, setEditingCompanyName] = useState("");

  useEffect(() => {
    try {
      axiosSecure
        .get("/companies")
        .then((res) => setProductCompany(res.data.data))
        .catch((err) => setGetErr(err.response.data.message));
    } catch (err) {
      console.log(err);
    }
  }, [axiosSecure]);

  const formik = useFormik({
    initialValues: {
      companyName: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.companyName) {
        errors.companyName = "Company name is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { companyName } = values;
      const info = {
        companyName: companyName,
      };

      try {
        axiosSecure
          .post("/companies/create-company", info)
          .then((res) => {
            if (res.data.data) {
              setErr("");
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Company Added successfully",
                showConfirmButton: false,
                timer: 1500
              });
              setProductCompany([...productCompany, res.data.data]);
              formik.resetForm();
            }
          })
          .catch((err) => {setErr(err.response.data.message);
            Swal.fire({
              position: "center",
              icon: "error",
              title: `${err.response.data.message}`,
              showConfirmButton: false,
              timer: 1500
            });
          });
      } catch (err) {
        setErr(err.response.data.message);
      }
    },
  });

  const handleEditClick = (company) => {
    setEditingCompanyId(company._id);
    setEditingCompanyName(company.companyName);
    
  };

  const handleSaveClick = async (companyId) => {
    try {
      await axiosSecure.patch(`/companies/${companyId}`, { companyName: editingCompanyName })
        .then((res) => {
          if (res.data.data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "company name updated",
              showConfirmButton: false,
              timer: 1500
            });
            setEditingCompanyId(null);
            setEditingCompanyName("");
            // Update the company name in the list.
            setProductCompany((prevCompanies) =>
              prevCompanies.map((company) =>
                company._id === companyId
                  ? { ...company, companyName: editingCompanyName }
                  : company
              )
            );
          }
        })
        .catch((err) => setErr(err.response.data.message));
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    setEditingCompanyName(e.target.value);
  };

  const handleDelete=(id)=>{
   try{
    axiosSecure.delete(`/companies/${id}`)
    .then(res=>{if(res.data.data){
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          const remaining = productCompany.filter(company=>company._id !== id)
          setProductCompany(remaining)
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    
    }})
   }catch(err){
console.log(err)   }
  }
  return (
    <div>
      <WebsiteTitle title="Add Company" />
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Company Info" />
          </CardHeader>
          <div>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid">
                  {/* Company Name */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="companyName">
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.companyName}
                      placeholder="Enter your Company Name"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.companyName && formik.errors.companyName && (
                      <div className="text-red-500">{formik.errors.companyName}</div>
                    )}
                  </div>
                </div>
                {err && <p className="text-red-600">{err}</p>}
                <div className="form-control mt-4">
                  <Button type="submit">Add Company</Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col">
              <div className="w-full text-center mb-20">
                <CustomTitle heading="All Companies" />
              </div>
              {
                productCompany.length> 0? <div className="w-full">
                {getErr ? (
                  <p className="text-red-400 text-center">{getErr}</p>
                ) : (
                  <div>
                    {productCompany?.map((company) => (
                      <div key={company._id}>
                        <div className="rounded-xl bg-slate-100 mb-4 p-5 flex gap-10 items-center">
                          <div className="w-full">
                            <span className="text-black font-bold text-xl">
                              Company Name:{" "}
                            </span>
                            {editingCompanyId === company._id ? (
                              <input
                                type="text"
                                value={editingCompanyName}
                                onChange={handleInputChange}
                                className="w-full mt-2 text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                              />
                            ) : (
                              <span className="text-black font-bold text-xl">
                                {company.companyName}
                              </span>
                            )}
                          </div>
                          <div className="text-end flex gap-4 flex-col">
                            {editingCompanyId === company._id ? (
                              <Button onClick={() => handleSaveClick(company._id)}>
                                Save
                              </Button>
                            ) : (
                              <span className="text-slate-700 cursor-pointer" onClick={() => handleEditClick(company)}>
                                <FaEdit size={20} />
                              </span>
                            )}
                            <span className="text-red-700">
                              <MdDelete onClick={()=>handleDelete(company?._id)} size={20} />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div> : <NoData/>
              }
              
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddCompany;
