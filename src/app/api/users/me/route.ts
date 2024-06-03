import { NextResponse,NextRequest } from "next/server";
import getData from "@/helpers/tokenToData";


export async function GET(request:NextRequest) {
    try {
        const user = getData(request);
        return NextResponse.json({user,status:200});
    } catch (error:any) {
        return NextResponse.json({
            error:error,
            status:500
        })
    }
}