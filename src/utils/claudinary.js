import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  Cloud_Name: process.env.CLOUDINARY_CLOUD_NAME,
  Api_Key: process.env.CLOUDINARY_API_KEY,
  Api_Secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function (localfilepath) {
  try {
    if (!localfilepath) return null;
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localfilepath);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
  }
};

export {uploadOnCloudinary}