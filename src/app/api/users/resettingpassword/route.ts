import sendMail from "@/helpers/mailer";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request:NextRequest) {
    try {
        let {email} = await request.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message : "User not found", status : 400});
        }

        const res = sendMail({userId:user._id, emailType:"RESET", email});
        return NextResponse.json({message:"Mail has been sent", success:true, status:200});
    } catch (error:any) {
        return NextResponse.json({error, status:500});
    }
}