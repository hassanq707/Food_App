const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
        'mongodb+srv://hassanq_706:JDc2ktmDOPsT7G7b@cluster0.za2s4fw.mongodb.net/Food_App'
        );
        console.log("DB Connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
    };

module.exports = {
    connectDB
}