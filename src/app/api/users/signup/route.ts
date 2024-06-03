import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import sendMail from "@/helpers/mailer";

connect();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {email, username, password} = reqBody;
        
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error:"User already exists", status:400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        // console.log(hashedPassword);
        const data = await User.create({username, email, password:hashedPassword});
        // console.log(data);

        const res = await sendMail({userId:data._id, emailType: "VERIFY", email:data.email})
        console.log(res);

        return NextResponse.json({
            message:"User created successfully",
            status : 200,
            data
        })

    } catch (error : any) {
        return NextResponse.json({error:error.message, status:500})
    }
}

