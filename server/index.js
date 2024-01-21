import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import DB from "./Database/DB.js";
import courseRoutes from "./routes/course.js";
import userRoutes from "./routes/user.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// Routes
app.use("/course", courseRoutes);
app.use('/user', userRoutes);


// Database connection
DB();

app.listen(process.env.PORT || 4000, () => {
    console.log(`server listening http://localhost:${process.env.PORT || 4000}`);
})
