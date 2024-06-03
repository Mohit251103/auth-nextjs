import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function POST(request:NextRequest) {
    try {
        const {token, password} = await request.json();

        const user = await User.findOne({forgotPasswordToken:token, forgotPasswordTokenExpiry : {$gt:Date.now()}});

        if(!user){
            return NextResponse.json({error:"Invalid token", status:400});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message:"Password changed successfuly", success:true, status:200});

    } catch (error) {
        return NextResponse.json({error,status:500});
    }
}