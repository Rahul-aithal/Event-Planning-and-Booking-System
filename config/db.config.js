import mongoose from "mongoose"

const dbconnect = async () => {
    try {
        const uri = await "mongodb://localhost:27017/Database"

        mongoose.connect(uri);
        console.log("DataBase successfully connected ");

    }
    catch (err) {
        console.error("Error in connecting to data base", err);
    }
}

export default  dbconnect;