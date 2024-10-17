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
              setProductCompany([...productCompany, res.data.data]);
              formik.resetForm();
            }
          })
          .catch((err) => setErr(err.response.data.message));
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
      const remaining = productCompany.filter(company=>company._id !== id)
      
      setProductCompany(remaining)
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
