import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {

    try {
        const { id } = await request.json();
        const user = await User.findById(id);
        if(!user){
            return NextResponse.json({message:"User not found", status:400});
        }

        return NextResponse.json({message:"User found", success:true, isverified:user.isVerified});
    } catch (error) {
        return NextResponse.json({ error, status: 500 });
    }

}