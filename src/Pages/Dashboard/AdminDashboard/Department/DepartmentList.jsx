import NoData from "@/customComponents/iconComponents/NoData";
import useAdmin from "@/Hooks/useAdmin";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useDepartment from "@/Hooks/useDepartment";

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import UpdateDepartment from "./UpdateDepartment";
import Swal from "sweetalert2";

const DepartmentList = () => {
  const [departments, loading, refetch] = useDepartment();
  const axiosSecure = useAxiosSecure();
  const [err, setErr] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleDelete = (id) => {
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
        try {
          axiosSecure
            .delete(`/departments/${id}`)
            .then((res) => {
              if (res.data.data) {
    
                refetch();
              }
            })
            .catch((err) => {
              setErr(err.response.data.message);
            });
        } catch (err) {
          console.log(err);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
   
  };

  // Filter departments based on the search term
  const filteredDepartments = departments.filter((department) =>
    department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="border-2 border-stone-400">
        <div className="p-3">
          <label className="mr-4" htmlFor="search">
            Search:
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type here"
            className="p-1 outline-blue-500 bg-slate-200 border-stone-400 rounded-md"
          />
        </div>
        <div className="divider"></div>
        <div className="p-3">
          {err ? (
            <p className="text-red-600">{err}</p>
          ) : (
            <div >
              {filteredDepartments.length > 0 ? (
                <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
                  <thead>
                    <tr>
                      <th>Department Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDepartments.map((department) => (
                      <tr key={department._id}>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                          <span onClick={() => handleEditClick(department)}>
                            <CiEdit size={20} />
                          </span>
                          <MdDelete
                            onClick={() => handleDelete(department._id)}
                            size={20}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> </div>
              ) : (
                <NoData />
              )}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <UpdateDepartment
            refetch={refetch}
            department={selectedDepartment}
            loading={loading}
            onClose={handleCloseModal}
          />
        </dialog>
      )}
    </div>
  );
};

export default DepartmentList;
