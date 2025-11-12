import express, { urlencoded } from "express";
import dotenv from "dotenv";

import {connectDB} from "./lib/db.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
// app.use(express({urlencoded : true}));
app.use("/api/auth", authRoute);


app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
    connectDB();
})