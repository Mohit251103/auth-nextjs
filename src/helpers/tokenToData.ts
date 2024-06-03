import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export default function getData(request : NextRequest){
    try {
        const token = request.cookies.get('token')!.value;
        const user:any = jwt.verify(token,process.env.SECRET_KEY!);
        return user;
    } catch (error:any) {
        console.log(error);
    }
}