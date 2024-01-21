import mongoose from "mongoose";

const DB = () => mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database successfully connected.");
}).catch((err) => {
    console.log(err.message);
});

export default DB;