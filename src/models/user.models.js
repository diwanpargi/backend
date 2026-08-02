import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {use} from "react"

const UserSchema=mongoose.Schema(
    {
    username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,//cloudinary
            required:true,
           
        },
        coverImage:{
            type:String,//cloudinary
         },
         watchhistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
         ],
        password:{
            type:String,
            required:[true,'password required'],
            
        },
        password:{
            type:String,
            required:[true,'password required'],
            
        },
        refreshtoken:{
            type:String,
          },
    },
    {timestamps:true})
    
    UserSchema.pre("save",function(next){
        if(!isModified(password)) return next();

        this.password= await bcrypt.hash(this.password,10)
        next()
    })
UserSchema.methods.isPasswordCorrect= async function(password) {
    return await bcrypt.compare(this.password,password)
}
    
UserSchema.methods.generateAccessToken= function() {
    return  jwt.sign(
        {
            _id:this._id,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:process.env.ACCESS_TOKE_EXPIRY}
    )
    
}

UserSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



    export const User=mongoose.model("User",UserSchema)