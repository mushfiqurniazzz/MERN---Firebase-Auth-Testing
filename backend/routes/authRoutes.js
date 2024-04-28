//importing necessary librarys and functions
const express = require('express');
const { google, signin, signup } = require('../controllers/authControllers.js');

//using the express router for declaring routes
const router = express.Router();

//api routes for authentication functionalities
router.post('/signup', signup);
router.post('/signin', signin);
//this is for fire base email authentication that we will be adding, since firebase is a backend as a service we cannot do anything except for calling it's api but this api will call that and this api will also save the details of user that logged in from the fire base 
router.post('/google', google)

//exporting the routes
module.exports = router;