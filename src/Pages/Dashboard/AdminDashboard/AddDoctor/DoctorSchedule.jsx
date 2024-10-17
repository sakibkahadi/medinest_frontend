import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css'; // Import your custom CSS here
import { format } from 'date-fns';
import useAxiosSecure from '@/Hooks/useAxiosSecure';

const DoctorSchedule = () => {
  const [timeRange, setTimeRange] = useState({ start: null, end: null });
  const [error, setError] = useState("")
  const [serverErr, setServerErr] = useState(false)
 
const axiosSecure = useAxiosSecure()
  // Function to handle time range selection
  const handleTimeSelection = () => {
    if (timeRange.start && timeRange.end) {
      const startTime = format(timeRange.start, 'HH:mm');
      const endTime = format(timeRange.end, 'HH:mm');
      setError("")
      // Log the result in the desired format
      const info = {
        startTime, endTime
      }
      try{
        axiosSecure.post('/schedules', info)
        .then(res=>{
          if(res.data.data){
            console.log('created')
          }
        }).catch(err=>setServerErr(err.response.data.errorSources[0].message))
      }catch(err){
        setError(err)
      }
    } else {
      setError('Please select both start and end times.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Time Range</h2>

      {/* Select Time Range */}
      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Start Time
            </label>
            <DatePicker
              selected={timeRange.start}
              onChange={(date) => setTimeRange(prev => ({ ...prev, start: date }))}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Start Time"
              dateFormat="HH:mm" 
              placeholderText="Select Start Time"
              className="border border-gray-300 rounded-lg p-2 w-full 
              bg-slate-200 focus:outline-blue-300"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              End Time
            </label>
            <DatePicker
              selected={timeRange.end}
              onChange={(date) => setTimeRange(prev => ({ ...prev, end: date }))}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="End Time"
              dateFormat="HH:mm"
              placeholderText="Select End Time"
              className="border border-gray-300 rounded-lg p-2 w-full 
              bg-slate-200 focus:outline-blue-300"
            />
          </div>
        </div>

        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-4 py-2 rounded-lg w-full"
          onClick={handleTimeSelection}
        >
          Confirm Time
        </button>
      </div>

{
  error && !serverErr ? <p className="text-sm text-gray-500">
 {error}
</p>: serverErr? <p className="text-sm text-gray-500">
 {serverErr}
</p> :''
}
     
    </div>
  );
};

export default DoctorSchedule;
