import NoData from "@/customComponents/iconComponents/NoData";
import useAppointmentByUser from "@/Hooks/useAppoinmentsByUser";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import AppointmentPayment from "./AppointmentPayment";
import Swal from "sweetalert2";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const AppointmentList = () => {
  const [appointments, , refetch] = useAppointmentByUser();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [convertedPrice, setConvertedPrice] = useState("");

  const convertTo12HourFormat = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hourNumber = parseInt(hours, 10);
    const ampm = hourNumber >= 12 ? "PM" : "AM";
    const adjustedHour = hourNumber % 12 || 12;
    return `${adjustedHour}:${minutes} ${ampm}`;
  };

  const handleBuyClick = (id, price) => {
    setId(id);
    setConvertedPrice(price);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`appointments/${id}`).then((res) => {
          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Appointment is deleted",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      {appointments?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>My Name</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <th className="whitespace-nowrap">{appointment?.doctorName?.name}</th>
                  <td className="whitespace-nowrap">{appointment?.patientName}</td>
                  <td className="whitespace-nowrap">{appointment?.appointmentDate}</td>
                  <td className="whitespace-nowrap">
                    {convertTo12HourFormat(appointment?.appointmentTime)}
                  </td>
                  <td className="whitespace-nowrap">{appointment?.price} TAKA</td>
                  <td className="whitespace-nowrap">{appointment.status}</td>
                  <td className="whitespace-nowrap">
                    {appointment?.status === "confirmed" ? (
                      <div className="text-green-600 font-bold text-center">Paid</div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-xs md:text-sm"
                          onClick={() =>
                            handleBuyClick(appointment?._id, appointment?.price)
                          }
                        >
                          Pay
                        </button>
                        <MdDelete
                          onClick={() => handleDelete(appointment?._id)}
                          color="red"
                          size={20}
                          className="cursor-pointer"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData />
      )}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <AppointmentPayment refetch={refetch} price={convertedPrice} _id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
