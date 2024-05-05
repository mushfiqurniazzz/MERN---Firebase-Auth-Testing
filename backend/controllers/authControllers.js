//importing functions, database model and libraries for creating functions in each api end point
const User = require('../models/userModel.js');
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js');
const jwt = require('jsonwebtoken');

//created a signup function that takes the necessary informations and saves the email and password in the database
const signup = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const newUser = new User({
            email: email,
            //if we haden't created the the function that saves the password after hashing it using the pre save hook from the mongoose library we would have to create that function here
            password: password,
        });

        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }
};


//created a signin function that takes the necessary informations and searches in the database if any users with the same credentials exit or not if not sends a error
const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compare(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET
        );

        const { password: pass, ...rest } = validUser._doc;

        res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        next(error);
    }
};

//created a google authentication function that can be used to save, create or log in new users to the database
const google = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({

                email: req.body.email,
                password: hashedPassword
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { google, signup, signin }