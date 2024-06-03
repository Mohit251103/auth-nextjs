import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest) {
    try {
        
        const reqBody = await request.json();
        const {token} = reqBody;
    
        const user = await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}});

        if(!user){
            return NextResponse.json({message:"Invalid token",status:400});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message:"User verified successfully", success:true, status:200});
    } catch (error) {
        return NextResponse.json({error,status:500});
    }
}