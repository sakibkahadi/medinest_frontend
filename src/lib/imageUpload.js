// Cloudinary configuration
const cloudName = "doocqhmpu";
const uploadPreset = "sakibkk";

// Upload image to Cloudinary
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (response.ok) {
      return data.secure_url; //
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    return null;
  }
};