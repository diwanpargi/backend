import { User } from "../models/user.models";
import { asyncHandler } from "../utils/asynchandeler";
import { ApiError } from "../utils/Apierror";
import jwt, { verify } from "jsonwebtoken"

//take accesstoken from cookies
//decode token using jwt.verify
//find user
//next()

export const jwtverify= asyncHandler(async (req,res ,next)=>{

    try {
        const token= req.cookies?.accesstoken  ||req.header("authorization").replace("Bearer","");
    
        if(!token){
    
        }
        const decodedtoken=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
         
        if(!decodedtoken){
    
        }
        const user=await User.findById(decodedtoken?._id).select(-password -refreshtoken);
        if(!user){
    
        }
    
        req.user=user;
        next();
        
    } catch (error) {
        
    }
})



























// export const jwtverify= asyncHandler(async(req,res,next)=>{

//  try {
//     const token=req.cookies?.accesstoken || req.header("authorization")?.replace("Bearer","");
//     if(!token){
   
//     }
//     const decodedtoken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
//     if(!decodedtoken){
   
//     }
//     const user= await User.findById(decodedtoken?._id).select(-password -refreshtoken);
//    if(!user){
       
//    }
//    req.user=user;
//    next();
//  } catch (error) {
//     throw new ApiError(401,error?.message,"invalid Access token");
//  }


// });