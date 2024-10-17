import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Helper function to format time as AM/PM
const formatTime = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const isPM = hour >= 12;
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for AM
  const formattedMinute = minute < 10 ? `0${minute}` : minute;
  return `${formattedHour}:${formattedMinute} ${isPM ? "PM" : "AM"}`;
};

// Helper function to convert time to 24-hour format
const convertTo24HourFormat = (time) => {
  const [hourMinute, period] = time.split(" ");
  let [hour, minute] = hourMinute.split(":").map(Number);

  if (period === "PM" && hour < 12) {
    hour += 12;
  }
  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

// Helper function to format date as dd/mm/yyyy
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Appointment = ({ _id, name, intervals }) => {
  const [error, setError] = useState("");
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { userData } = useContext(AuthContext);
  const [bookedSlots, setBookedSlots] = useState([]);
  const axiosPublic = useAxiosPublic();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset the selected time when the date changes

    if (date) {
      const appointmentDate = formatDate(date);
      try {
        axiosPublic
          .get(`appointments/booked-times/?doctorName=${_id}&appointmentDate=${appointmentDate}`)
          .then((res) => setBookedSlots(res.data.data))
          .catch((err) => setError(err.response?.errorSources?.[0]?.message || err.message));
      } catch (err) {
        setError(err);
      }
    }
  };

  let availableSlotsArray = intervals?.filter((slot) => !bookedSlots.includes(slot));
  

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    // const convertedTime = convertTo24HourFormat(time);
    // // console.log(convertedTime); 
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      const info = {
        doctorName: _id,
        patientName: userData.name? userData.name : 'Human',
        patientEmail: userData?.email,
        appointmentDate: formatDate(selectedDate),
        appointmentTime: convertTo24HourFormat(selectedTime), // Use the converted time here
      };
      console.log(info);
      try {
        axiosPublic.post('/appointments/create-appointment', info)
          .then(res => {
            if (res.data.success) {
              setError("")
              console.log(res.data.data);
              console.log('booked');
            }
          }).catch(err => setError(err.response?.data.errorSources?.[0]?.message ));
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please select a date and time before booking.");
    }
  };

  return (
    <div className="">
      {!isBookingVisible ? (
        <button
          onClick={() => setIsBookingVisible(true)}
          className="bg-blue-600 border text-xs text-white p-2 rounded-md hover:bg-blue-700"
        >
          Book Appointment
        </button>
      ) : (
        <>
          <div>
            <div className="md:mt-[-5px] flex items-center justify-center gap-5">
              <label className="font-semibold" htmlFor="date">Select Date</label>
              <DatePicker minDate={new Date()}
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                className="w-full p-2 text-black outline-blue-400 rounded-md"
                placeholderText="Select a date"
              />
            </div>

            {selectedDate && (
              <div className="my-4">
                <h2 className="text-lg font-semibold text-slate-600">
                  Available Time Slots:
                </h2>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {availableSlotsArray?.map((time, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded-lg border ${
                        selectedTime === time
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      } hover:bg-blue-500 hover:text-white`}
                      onClick={() => handleTimeSelect(formatTime(time))} // Pass the formatted time to handleTimeSelect
                    >
                      {formatTime(time)} {/* Display in 12-hour format */}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedTime && (
              <div className="mt-4">
                <button
                  onClick={handleBookAppointment}
                  className="border border-blue-600 text-blue-500 hover:text-white p-2 rounded-md w-full hover:bg-blue-700"
                >
                  Confirm Appointment
                </button>
                {error ? <p className="text-red-500">{error}</p> : ''}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsBookingVisible(false)}
            className="bg-gray-500 w-full text-white p-2 rounded-md mt-4 hover:bg-gray-600"
          >
            Hide
          </button>
        </>
      )}
    </div>
  );
};

export default Appointment;
