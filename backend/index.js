import dotenv from "dotenv"
import app from "./server.js"
import ReviewsDAO from "../dao/reviewsDAO.js"
import { MongoClient } from "mongodb"

dotenv.config();
MongoClient.connect(
    process.env.MONGO_HOST,
    {
        maxPoolSize:50,
        wtimeoutMS:2500
    }).catch(err =>{
        console.log(err.stack);
        process.exit(1);
    }).then(async client => {
        await ReviewsDAO.injectDB(client);
        app.listen(8000,()=>{
            console.log("listening 8000")
        })
    })