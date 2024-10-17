/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { AiFillCamera } from "react-icons/ai"; // Import a camera icon

const PatientImage = ({ initialImage, onUpload }) => {
  const [image, setImage] = useState(initialImage || null);
  const fileInputRef = useRef(null); 

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file); 

   
      const uploadedUrl = await onUpload(file);
      console.log("New Image URL:", uploadedUrl); 
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative w-fit">
      <img
        src={image || "default-image-url.png"} 
        alt="Uploaded"
        className="w-20 h-20  object-cover border-2 border-gray-300"
      />
      <label className="absolute top-0 right-0 cursor-pointer" onClick={triggerFileInput}>
        <AiFillCamera size={24} className="bg-white rounded-full p-1 shadow-lg" />
      </label>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef} 
        onChange={handleImageChange}
        className="hidden" 
      />
    </div>
  );
};



export default PatientImage;
