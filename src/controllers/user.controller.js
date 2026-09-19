import { asyncHandler } from "../utils/asynchandeler.js";
import { ApiError } from "../utils/Apierror.js";
import { uploadOnCloudinary } from "../utils/claudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { User } from "../models/user.models.js";
import { use } from "react";
import jwt from "jsonwebtoken"
const generateAccessAndRefreshToken= asynchandler(async(userid)=>{
 try {
   const user=await User.findById(userid);
 
   const accesstoken=await user.generateAccesstoken();
   const refreshtoken=await user.generateRefreshToken();
 
   user.refreshtoken=refreshtoken;
  
   await user.save({validateBeforeSave:false})
   return {accesstoken,refreshtoken}
 } catch (error) {
  console.log("actual erroror",error);

  throw new ApiErrorError(400,"cant generate access and refreshtoken");
  
 }

});
const registerUser = asynchandler(async (req, res) => {
  //get user details from frontend
  //validation-not empty
  //check if user already exists : username,email
  //check for Image,check for avatar
  //upload them to cloudinary,avatar
  //create user object -create entry in db
  //remove password and refresh token field from response
  // check for user creation
  //return response


    //get user details from frontend

  const { fullname, username, password, email } = req.body;

    //validation-not empty

  if (
    [fullname, username, password, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

    //check if user already exists : username,email

  const existedUser=await User.findOne({
    $or:[{username},{email}]
  })
  if(existedUser){
    throw new ApiError(409, "user with email or username already exist");
  }

   //check for Image,check for avatar

const avatarLocalPath=req.files?.avatar[0]?.path;

let coverImagelocalPath;

if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length>0){
    coverImagelocalPath=req.files.coverImage[0].path;
}
if(!avatarLocalPath){
    throw new ApiError(400, "avatar file is required")
}

  //upload them to cloudinary,avatar

const avatar=await uploadOnCloudinary(avatarLocalPath);
const coverImage=await uploadOnCloudinary(coverImagelocalPath);

if(!avatar){
    throw new ApiError(400, "avatar file is required")
}

const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
})

const createduser=await User.findById(user._id).select( " -password -refreshtoken")

if(!createduser){
  throw new ApiError(500, "Something went wrong while registering user");
}

  return res
    .status(201)
    .json(new ApiResponse(200, createduser, "user registered successfully"));

});

const loginuser= asyncHandler(async(req,res)=>{
  //reqbody->data
  //username or email
  //find the user
  //password check
  // access and refresh token
  //send cookie

  const[username,email,password]=req.body;

  const user=User.findOne({
    $or:[{username},{email}]
  })

  if(!user){

  }

  const passwordcheck= await user.isPasswordCorrect(password);

  if(!password){

  }
  const [accesstoken,refreshtoken]=await generrateaccessandrefreshtoken(user._id);

  const option={
    httpOnly:true,
    secure:true
  }
 
  return res.status(201)
  .cookies("accesstoken",accesstoken,option)
  .cookies("refreshtoken",refreshtoken,option)
  .json(200,
    {accesstoken,
    refreshtoken,},
    "login successfully"
  )
});

const logoutuser= asyncHandler(async(req,res)=>{
  //find user
  //delete cookie
  //delete refreshtoken

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
      refreshtoken:undefined
    }
  },
  {
    new:true
  }
  )
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
  .status(200)
  .clearCookie("accesstoken",options)
  .clearCookie("refreshtoken",options)
  .json(new ApiResponse(200,{},"user logged out")

)
});

const resetpassword= asyncHandler(async(req,res)=>{
  
})