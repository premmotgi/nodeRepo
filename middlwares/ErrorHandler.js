//A global exception handler, if error is passed with next then code will come in the end here and this piece of code
//will handle that error thingy to make sure system doesnt go in infinite loop.

const ErrorResponse = require("../commons/ErrorResponse");

const errorHandler = (err, req, res, next) => {

    console.log(err.stack.red);

    //copy whole object
    let error = { ...err };

    error.message = err.message;

    if (err.name === 'CastError') {

        const msg = `Response not Found with id or key: ${err.value}`;
        error = new ErrorResponse(msg, 404);

    }

    if (err.code === 11000) {

        const msg = `Friend Already exists with name: ${req.body.name}`;
        error = new ErrorResponse(msg, 400);

    }



    if (err.name === 'ValidationError') {

        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);


    }

    res.status(error.statusCode || 500).json({

        status: "Failure",
        Error: error.message || "Server Error"


    });


}
module.exports = errorHandler;

