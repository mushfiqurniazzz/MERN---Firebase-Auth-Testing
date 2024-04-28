//importing json web token to create the function
const jwt = require("jsonwebtoken")

//token function that sends a token as a response to the client
const token = () => {
    jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
    return response.status(200).json({ msg: "user logged in", token })
};

//exporting the created token function
module.exports = token