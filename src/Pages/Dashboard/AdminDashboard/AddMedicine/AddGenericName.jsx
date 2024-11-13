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


const AddGenericName = () => {
  const [err, setErr] = useState("");
  const [getErr, setGetErr] = useState("");
  const axiosSecure = useAxiosSecure();
  const [genericNames, setGenericNames] = useState([]);
  const [editingGenericId, setEditingGenericId] = useState(null);
  const [editingGenericName, setEditingGenericName] = useState("");

  useEffect(() => {
    try {
      axiosSecure
        .get("/genericName")
        .then((res) => setGenericNames(res.data.data))
        .catch((err) => setGetErr(err.response.data.message));
    } catch (err) {
      console.log(err);
    }
  }, [axiosSecure]);

  const formik = useFormik({
    initialValues: {
      genericName: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.genericName) {
        errors.genericName = "Generic name is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { genericName } = values;
      const info = {
        genericName: genericName,
      };

      try {
        axiosSecure
          .post("/genericName/create-generic-name", info)
          .then((res) => {
            if (res.data.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Generic Name added",
                showConfirmButton: false,
                timer: 1500
              });
              setErr("");
              setGenericNames([...genericNames, res.data.data]);
              formik.resetForm();
            }
          })
          .catch((err) => setErr(err.response.data.message));
      } catch (err) {
        setErr(err.response.data.message);
      }
    },
  });

  const handleEditClick = (generic) => {
    setEditingGenericId(generic._id);
    setEditingGenericName(generic.genericName);
  };

  const handleSaveClick = async (genericId) => {
    try {
      await axiosSecure
        .patch(`/genericName/${genericId}`, { genericName: editingGenericName })
        .then((res) => {
          console.log(res.data)
          if (res.data.data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Generic Name updated successfully",
              showConfirmButton: false,
              timer: 1500
            });
            setEditingGenericId(null);
            setEditingGenericName("");
            setGenericNames((prevGenerics) =>
              prevGenerics.map((generic) =>
                generic._id === genericId
                  ? { ...generic, genericName: editingGenericName }
                  : generic
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
    setEditingGenericName(e.target.value);
  };

  const handleDelete = (id) => {
    try {
      axiosSecure.delete(`/genericName/${id}`)
        .then((res) => {
          if (res.data.data) {
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
                const remaining = genericNames.filter((generic) => generic._id !== id);
                setGenericNames(remaining);
                Swal.fire({
                  title: "Deleted!",
                  text: "Generic Name has been deleted.",
                  icon: "success"
                });
              }
            });
           
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <WebsiteTitle title="Add Generic Name" />
      <div>
        <Card className="border-none">
          <CardHeader className="text-center">
            <CustomTitle heading="Generic Name Info" />
          </CardHeader>
          <div>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid">
                  {/* Generic Name */}
                  <div className="form-control mb-4 space-y-3">
                    <label className="font-semibold" htmlFor="genericName">
                      Generic Name of Medicine
                    </label>
                    <input
                      id="genericName"
                      name="genericName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.genericName}
                      placeholder="Enter Generic Name"
                      className="w-full text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                    />
                    {formik.touched.genericName && formik.errors.genericName && (
                      <div className="text-red-500">{formik.errors.genericName}</div>
                    )}
                  </div>
                </div>
                {err && <p className="text-red-600">{err}</p>}
                <div className="form-control mt-4">
                  <Button type="submit">Add Medicine Generic Name</Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col">
              <div className="w-full text-center mb-20">
                <CustomTitle heading="All Generic Names" />
              </div>
              {genericNames.length > 0 ? (
                <div className="w-full">
                  {getErr ? (
                    <p className="text-red-400 text-center">{getErr}</p>
                  ) : (
                    <div>
                      {genericNames.map((generic) => (
                        <div key={generic._id}>
                          <div className="rounded-xl bg-slate-100 mb-4 p-5 flex gap-10 items-center">
                            <div className="w-full">
                              <span className="text-black font-bold text-xl">
                                Generic Name:{" "}
                              </span>
                              {editingGenericId === generic._id ? (
                                <input
                                  type="text"
                                  value={editingGenericName}
                                  onChange={handleInputChange}
                                  className="w-full mt-2 text-sm p-3 border bg-slate-200 border-gray-300 rounded-md focus:outline-blue-300"
                                />
                              ) : (
                                <span className="text-black font-bold text-xl">
                                  {generic.genericName}
                                </span>
                              )}
                            </div>
                            <div className="text-end flex gap-4 flex-col">
                              {editingGenericId === generic._id ? (
                                <Button onClick={() => handleSaveClick(generic._id)}>
                                  Save
                                </Button>
                              ) : (
                                <span
                                  className="text-slate-700 cursor-pointer"
                                  onClick={() => handleEditClick(generic)}
                                >
                                  <FaEdit size={20} />
                                </span>
                              )}
                              <span className="text-red-700">
                                <MdDelete onClick={() => handleDelete(generic._id)} size={20} />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NoData />
              )}
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddGenericName;
