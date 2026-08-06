import { asyncHandler } from "../utils/asynchandeler.js";
import { ApiError } from "../utils/Apierror.js";
import { uploadOnCloudinary } from "../utils/claudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { User } from "../models/user.models.js";
import { use } from "react";

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

  const { fullname, username, password, email } = req.body;

  if (
    [fullname, username, password, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser=await User.findOne({
    $or:[{username},{email}]
  })
  if(existedUser){
    throw new ApiError(409, "user with email or username already exist");
  }
const avatarLocalPath=req.files?.avatar[0]?.path;

const coverImagelocalPath;


});
