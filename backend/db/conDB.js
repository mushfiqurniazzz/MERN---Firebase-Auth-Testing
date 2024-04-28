//importing the dotenv module as it contains the string that will be used to conenct to our database and mongoose library to connect to the database as it is much easy compared to how the official mongodb docs says
const mongoose = require('mongoose');
require("dotenv").config()

//conDb or connect to db will be a async function that will be waiting untill we are connected to the database
const conDB = async () => {
    try {
        //putting mongoose.connect inside a variable to console log it's host information
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.host}`);
    } catch (error) {
        //basic error handling
        console.error("Error connecting to MongoDB: ", error);
    }
};

//exportign the function
module.exports = conDB;