import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist", status: "400" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error:"Invalid credentials",status:401});
        }
        const secret = process.env.SECRET_KEY;
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(tokenData, secret!, {expiresIn: "1d"});

        const response = NextResponse.json({message: "Logged in successfully", status:200});
        response.cookies.set("token",token,{
            httpOnly:true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error, status: 500 });
    }
}