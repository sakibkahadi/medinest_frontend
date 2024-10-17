import { useState, useEffect } from "react";

const AmbulanceImageUploader = ({ initialImage, onUpload }) => {
  const [image, setImage] = useState(initialImage || "");

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedUrl = await onUpload(file);
      setImage(uploadedUrl);
    }
  };

  return (
    <div>
      {image ? (
        <img src={image} alt="Uploaded" className="w-full h-32 object-cover" />
      ) : (
        <div className="w-full h-32 flex items-center justify-center border bg-slate-200">
          No image uploaded
        </div>
      )}
      <input type="file" onChange={handleChange} className="mt-2" />
    </div>
  );
};

export default AmbulanceImageUploader;
