import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export default async function sendMail({userId, emailType, email}:any) {

    try {
        const hashedToken = await bcrypt.hash(userId.toString(),10);
    
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken : hashedToken, verifyTokenExpiry: Date.now()+3600000});
        }
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken : hashedToken, forgotPasswordTokenExpiry: Date.now()+3600000});
        }
    
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD
            }
        });
    
        const info = await transport.sendMail({
            from:"mohit@gmail.com",
            to:email,
            subject:emailType==="VERIFY"?"Verify Email" : "Reset Password",
            html:`<p>Click <a href='${process.env.DOMAIN}/${emailType==="VERIFY"?'verifyemail':'resetpassword'}?token=${hashedToken}'>here</a> to ${emailType==="VERIFY"?"verify":"reset"} the password</p>`
        })

        return info;
    } catch (error:any) {
        console.log(error.message);
    }
    
}