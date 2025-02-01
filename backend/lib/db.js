import mongoose from 'mongoose'



export const dbConnect =async()=>{


    try {
        
     const conn=await   mongoose.connect(process.env.MONGODB_URL)

     console.log(`Connected to MongoDb ${conn.connection.host}`)
    } catch (error) {
        console.log(`Mongodb Connection error:`+error)
    }
}