//importing router, environmental variables, express library and function for connection with database
const express = require('express')
const conDB = require('./db/conDB')
const app = express()
const authRoutes = require('./routes/authRoutes.js')
const cors = require("cors")
const bodyParser = require('body-parser');
require("dotenv").config();
const port = process.env.PORT || 3000

// middleware to parse incoming request in bodies
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes)

//the database connection function
conDB()

//making the app listen at port stored in environmental variable or 5001
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})