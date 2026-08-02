import {cloudinary as v2} from "cloudinary"
import fs, { unlinkSync } from "fs"

cloudinary.config({
    Cloud_Name:process.env.CLOUDINARY_CLOUD_NAME,
    Api_Key : process.env.CLOUDINARY_API_KEY,
    Api_Secret :process.env.CLOUDINARY_API_SECRET
});

const UploadOnCloudinary= async (LocalFilePath)=>{
 

 try {
    if(!LocalFilePath) return null;
    
    const Response=await cloudinary.uploader.upload(LocalFilePath,{resorse_type:"auto"})
     console.log("file upload on cloudinary successfully",Response.url)
    return Response;

 } catch (error) {
    fs.unlinkSync(LocalFilePath)
    return null;
 }
}

export { UploadOnCloudinary }