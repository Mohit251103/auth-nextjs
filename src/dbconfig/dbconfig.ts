import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', ()=>{
            console.log("Connected the database successfully");
        })

        connection.on('error',(error)=>{
            console.log(error);
            process.exit();
        })
    } catch (error) {
        console.log(error);
    }
}
