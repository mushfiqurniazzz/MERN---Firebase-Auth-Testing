//error handler that sends the error message and the error status code
const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};

//exporting the error handler funcction
module.exports = errorHandler