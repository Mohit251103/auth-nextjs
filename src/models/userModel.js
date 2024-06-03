import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please enter the username"],
        unique:true
    },
    email:{
        type:String,
        required:[true, "Please enter the email"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Please enter the password"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry:Date,
    verifyToken: String,
    verifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema);
export default User;